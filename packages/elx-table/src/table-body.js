import { getCell, getColumnByCell, getRowIdentity } from './util';
import { hasClass } from 'element-uex/src/utils/dom';
import debounce from 'throttle-debounce/debounce';

export default {

  props: {
    store: {
      required: true
    },
    context: {},
    layout: {
      required: true
    },
    firstRowKey: String,
    lastRowKey: String,
    rowClassName: [String, Function],
    rowStyle: [Object, Function],
    fixed: String,
    highlight: Boolean,
    draggable: Boolean,
    sortByDrag: {
      type: Boolean,
      default: true
    }
  },

  render(h) {
    const columnsHidden = this.columns.map((column, index) => this.isColumnHidden(index));
    return (
      <div>
        <table
          class="el-table__body"
          cellspacing="0"
          cellpadding="0"
          width="100%"
          border="0">
          <colgroup>
            {
              this._l(this.columns, column =>
                <col
                  name={ column.id }
                  width={ column.realWidth || column.width }
                />)
            }
          </colgroup>
          <div class="table-drag-area">
            {
              this._l(this.data, (row, $index) =>
                [<tr
                  style={ this.rowStyle ? this.getRowStyle(row, $index) : ($index === this.dragIndex && this.isDrag ? 'visibility: hidden;' : null) }
                  draggable={this.draggable}
                  on-dragstart={ ($event) => this.handleDragStart(row, $index, $event) }
                  key={ this.table.rowKey ? this.getKeyOfRow(row, $index) : $index }
                  on-dblclick={ ($event) => this.handleDoubleClick($event, row) }
                  on-click={ ($event) => this.handleClick($event, row) }
                  on-contextmenu={ ($event) => this.handleContextMenu($event, row) }
                  on-mouseenter={ _ => this.handleMouseEnter($index) }

                  on-mousedown={ ($event) => this.handleMouseDown(row, $index, $event) }
                  on-mousemove={ ($event) => this.handleMouseMove(row, $index, $event) }
                  on-mouseup={ ($event) => this.handleMouseUp(row, $index, $event) }
                  on-mouseleave={ ($event) => this.handleMouseLeave(row, $index, $event) }
                  class={ [this.getRowClass(row, $index), ($index === this.dragIndex && this.isDrag ? 'elx-drag-row' : '')] }>
                  {
                    this._l(this.columns, (column, cellIndex) =>
                      <td
                        on-mousedown={ ($event) => this.handleDown($event, row, $index, column) }
                        class={ [column.id, column.align, column.className || '', columnsHidden[cellIndex] ? 'is-hidden' : '' ] }
                        on-mouseenter={ ($event) => this.handleCellMouseEnter($event, row) }
                        on-mouseleave={ this.handleCellMouseLeave }>
                        {
                          column.renderCell.call(this._renderProxy, h, { row, column, $index, store: this.store, _self: this.context || this.table.$vnode.context }, columnsHidden[cellIndex])
                        }
                      </td>
                    )
                  }
                  {
                    !this.fixed && this.layout.scrollY && this.layout.gutterWidth ? <td class="gutter" /> : ''
                  }
                </tr>,
                this.store.states.expandRows.indexOf(row) > -1 && !this.isDrag
                  ? (<tr
                    class="expand-tr"
                    draggable={this.draggable}
                    on-dragstart={ ($event) => this.handleDragStart(row, $index, $event, 'expand') }

                    on-mousedown={ ($event) => this.handleMouseDown(row, $index, $event) }
                    on-mousemove={ ($event) => this.handleMouseMove(row, $index, $event) }
                    on-mouseup={ ($event) => this.handleMouseUp(row, $index, $event) }
                    on-mouseleave={ ($event) => this.handleMouseLeave(row, $index, $event) }>
                    <td colspan={ this.columns.length } class="el-table__expanded-cell">
                      { this.table.renderExpanded ? this.table.renderExpanded(h, { row, $index, store: this.store }) : ''}
                    </td>
                  </tr>)
                  : ''
                ]
              ).concat(
                <el-tooltip effect={ this.table.tooltipEffect } placement="top" ref="tooltip" content={ this.tooltipContent }></el-tooltip>
              )
            }
          </div>
        </table>
        { this.isDrag
          ? (<div
            class="elx-drag-item"
            style={ 'top:' + this.dragTop }
            on-mousedown={ ($event) => this.handleDragDown($event) }
            on-mouseup={ ($event) => this.handleDragUp($event) }
          >
            <table cellspacing="0" cellpadding="0" border="0" width="100%" class="el-table__body">
              <colgroup>
                {
                  this._l(this.columns, column =>
                    <col
                      name={ column.id }
                      width={ column.realWidth || column.width }
                    />)
                }
              </colgroup>
              <tbody>
                <tr>
                  {
                    this._l(this.columns, (column, cellIndex) =>
                      <td>{column.renderCell.call(this._renderProxy, h, { row: this.dragData, $index: null, column, store: this.store, _self: this.context || this.table.$vnode.context }, columnsHidden[cellIndex])}</td>
                    )
                  }
                </tr>
              </tbody>
            </table>
          </div>) : ''
        }
      </div>
    );
  },

  watch: {
    'store.states.hoverRow'(newVal, oldVal) {
      if (!this.store.states.isComplex) return;
      const el = this.$el;
      if (!el) return;
      const rows = el.querySelectorAll('tbody > tr');
      const oldRow = rows[oldVal];
      const newRow = rows[newVal];
      if (oldRow) {
        oldRow.classList.remove('hover-row');
      }
      if (newRow) {
        newRow.classList.add('hover-row');
      }
    },
    'store.states.currentRow'(newVal, oldVal) {
      if (!this.highlight) return;
      const el = this.$el;
      if (!el) return;
      const data = this.store.states.data;
      const expandRows = this.store.states.expandRows;
      let expandIndexArr = [];
      expandRows.map(function(expandRow) {
        expandIndexArr.push(data.indexOf(expandRow));
      });
      expandIndexArr = expandIndexArr.sort((a, b) => a > b ? 1 : -1);
      const rows = el.querySelectorAll('.table-drag-area > tr');
      const oldRowIndex = data.indexOf(oldVal);
      const oldRowFilter = expandIndexArr.filter(function(index) {
        return index < oldRowIndex;
      });
      const newRowIndex = data.indexOf(newVal);
      const newRowFilter = expandIndexArr.filter(function(index) {
        return index < newRowIndex;
      });
      const oldRow = rows[oldRowIndex + oldRowFilter.length];
      const newRow = rows[newRowIndex + newRowFilter.length];
      if (oldRow) {
        oldRow.classList.remove('current-row');
      } else if (rows) {
        [].forEach.call(rows, row => row.classList.remove('current-row'));
      }
      if (newRow) {
        newRow.classList.add('current-row');
      }
    }
  },

  computed: {
    table() {
      return this.$parent;
    },

    data() {
      return this.store.states.data;
    },

    columnsCount() {
      return this.store.states.columns.length;
    },

    leftFixedCount() {
      return this.store.states.fixedColumns.length;
    },

    rightFixedCount() {
      return this.store.states.rightFixedColumns.length;
    },

    columns() {
      return this.store.states.columns;
    }
  },

  data() {
    return {
      tooltipContent: '',
      dragData: {},
      dragIndex: null,
      isDrag: false,
      dragTop: '0px',
      dragItem: null,
      mousePos: {x: '', y: ''},
      mousePosGap: {x: '', y: ''},
      changeItems: [],
      dropDoms: [],
      dropData: [],
      originPos: {x: 0, y: 0},
      dropMousePos: {x: 0, y: 0},
      isMouseDown: false,
      dragging: false
    };
  },

  created() {
    this.activateTooltip = debounce(50, function(tooltip) {
      tooltip.handleShowPopper();
      tooltip.showPopper = true;
    });
  },

  mounted: function() {
    document.body.addEventListener('mouseup', this.handleDragUp);
    document.body.addEventListener('mousemove', this.handleDragMove);
    document.body.addEventListener('mouseleave', this.hhandleDragUp);
    document.body.addEventListener('dragenter', this.handleDragEnter);
    document.body.addEventListener('dragover', this.handleDragOver);
    document.body.addEventListener('drop', this.handleBodyDrop);
    document.body.addEventListener('dragend', this.handleDragEnd);
  },
  beforeDestroy: function() {
    document.body.removeEventListener('mouseup', this.handleDragUp);
    document.body.removeEventListener('mousemove', this.handleDragMove);
    document.body.removeEventListener('mouseleave', this.hhandleDragUp);
    document.body.removeEventListener('dragenter', this.handleDragEnter);
    document.body.removeEventListener('dragover', this.handleDragOver);
    document.body.removeEventListener('drop', this.handleBodyDrop);
    document.body.removeEventListener('dragend', this.handleDragEnd);
  },

  methods: {
    handleBodyDrop: function(e) {
      e.stopPropagation();
      e.preventDefault();
    },
    handleDragEnd: function(e) {
      this.handleDrop(e);
      e.stopPropagation();
      e.preventDefault();
    },
    getTarget: function(event) {
      return event.target || event.srcElement;
    },
    getRowByIndex: function(index, nodes, e) {
      const data = this.store.states.data;
      const expandRows = this.store.states.expandRows;
      let expandIndexArr = [];
      expandRows.map(function(expandRow) {
        expandIndexArr.push(data.indexOf(expandRow));
      });
      expandIndexArr = expandIndexArr.sort((a, b) => a > b ? 1 : -1);
      const rows = nodes;
      const rowIndex = index;
      const rowFilter = expandIndexArr.filter(function(index) {
        return index < rowIndex;
      });
      const row = rows[rowIndex + rowFilter.length];
      if (expandIndexArr.indexOf(index) > -1) {
        return [this.getDomDetail(row, e), this.getDomDetail(rows[rowIndex + rowFilter.length + 1], e)];
      } else {
        return [this.getDomDetail(row, e)];
      }
    },
    tranformStr: function(str) {
      const strArr = str.split('-');
      for (let i = 1; i < strArr.length; i++) {
        strArr[i] = strArr[i].charAt(0).toUpperCase() + strArr[i].substring(1);
      }
      return strArr.join('');
    },
    getDomDetail: function(dom, e) {
      const dropDetail = {
        dom: dom,
        size: {width: dom.offsetWidth, height: dom.offsetHeight},
        innerHTML: dom.innerHTML,
        class: dom.getAttribute('class'),
        style: dom.getAttribute('style')
      };
      return dropDetail;
    },
    createDropDomList: function(e) {
      const self = this;
      const dropData = this.dropData;
      const dropDoms = this.dropDoms;
      let table;
      let colgroup;
      let col;
      let tr;
      if (dropData.length > 0) {
        const div = document.createElement('div');
        div.setAttribute('class', 'drop-dom-list');
        div.setAttribute('style', 'position: fixed; pointer-events: none; width: ' + this.dropDoms[0].size.width + 'px; height: 120px');
        if (typeof DataTransfer.prototype.setDragImage === 'function') {
          div.style.top = e.clientY + 20 + 'px';
          div.style.left = e.clientX + 20 + 'px';
        } else {
          div.style.top = e.clientY - 10 + 'px';
          div.style.left = e.clientX - 20 + 'px';
        }
        const compatible = ['-webkit-', '-moz-', '-o-', '-ms-', ''];
        let transform = '';

        dropDoms.map(function(dom, index) {
          table = document.createElement('table');
          table.setAttribute('class', 'drop-item el-table__body');
          table.setAttribute('cellspacing', '0');
          table.setAttribute('cellpadding', '0');
          table.setAttribute('border', '0');
          transform = '';
          compatible.map(function(c) {
            transform = transform + c + 'transform: rotate(' + (index === dropDoms.length - 1 ? 0 : (index % 2 === 0 ? 0 : 0)) + 'deg);';
          });
          table.setAttribute('style', dom.style + ';' + transform + 'position: absolute; top: ' + 2 * (dropDoms.length - 1 - index) + 'px; left: ' + 2 * (dropDoms.length - 1 - index) + 'px; width: ' + dom.size.width + 'px; height: ' + dom.size.height + 'px; margin: 0px; background: #fff; border:1px solid #d3d3d3');

          colgroup = document.createElement('colgroup');
          self.columns.map(function(column) {
            col = document.createElement('col');
            col.setAttribute('name', column.id);
            col.setAttribute('width', column.realWidth || column.width);
            colgroup.appendChild(col);
          });

          tr = dom.dom.cloneNode(true);

          table.appendChild(colgroup);
          table.appendChild(tr);

          div.appendChild(table);
        });
        const numDiv = document.createElement('div');
        numDiv.setAttribute('class', 'drop-dom-num');
        numDiv.setAttribute('style', 'position: absolute; top: 2px; left: 5px');
        numDiv.innerHTML = dropData.length;
        div.appendChild(numDiv);
        this.$el.appendChild(div);

        div.addEventListener('dragstart', function(e) {
          self.handleDragStart(null, null, e);
        });
        div.addEventListener('dragstart', function(e) {
          self.handleDropDomMouseMove(null, null, e);
        });
        if (typeof DataTransfer.prototype.setDragImage === 'function') {
          setTimeout(function() {
            self.$el.removeChild(div);
          });
        } else {
          this.dropDomList = div;
        }

        return div;
      }
      return null;
    },
    getDropDomList: function(item, index, e) {
      const self = this;
      let dropDoms;
      const pos = {
        x: e.clientX,
        y: e.clientY
      };
      this.dropMousePos = {x: pos.x, y: pos.y};
      this.dropDoms = [];
      this.dropData = [];
      this.originPos = pos;
      const selectedIdxArr = [];
      const childNodes = e.currentTarget.parentNode.childNodes;
      this.store.states.selection.map(function(d, i) {
        i = self.data.indexOf(d);
        if (index !== i) {
          selectedIdxArr.push(i);
          dropDoms = self.getRowByIndex(i, childNodes, e);
          self.dropDoms = self.dropDoms.concat(dropDoms[0]);

          self.dropData.push(self.data[i]);
        }
      });
      if (selectedIdxArr.indexOf(index) < 0) {
        dropDoms = this.getRowByIndex(index, childNodes, e);
        this.dropDoms = this.dropDoms.concat(dropDoms[0]);
        this.dropData.push(this.data[index]);
      }
    },
    handleMouseDown: function(item, index, e) {
      this.isMouseDown = true;
    },
    handleMouseMove: function(item, index, e) {
      if (this.isMouseDown) {
        if (typeof DataTransfer.prototype.setDragImage !== 'function') {
          this.getDropDomList(item, index, e);
          const node = this.createDropDomList(e);
          if (node) {
            node.dragDrop();
          }
          this.isMouseDown = false;
        }
      }
    },
    handleDropDomMouseMove: function(item, index, e) {
    },
    handleMouseUp: function(item, index, e) {
      this.isMouseDown = false;
    },
    handleDragStart: function(item, index, e, type) {
      this.dragging = true;
      e.dataTransfer.setData('text', 'data');
      e.dataTransfer.effectAllowed = 'copy';
      if (typeof DataTransfer.prototype.setDragImage === 'function') {
        this.getDropDomList(item, index, e);
        const node = this.createDropDomList(e);
        if (node) {
          e.dataTransfer.setDragImage(node, -20, -20, e.currentTarget);
        }
      }
      this.$emit('drop-start', this.dropData);
    },
    handleDragEnter: function(e) {
      if (this.dropDomList) {
        this.$el.removeChild(this.dropDomList);
        this.dropDomList = null;
      }
      if (!this.dragging) {
        return;
      }
      e.dataTransfer.dropEffect = 'copy';
      e.preventDefault();
      e.stopPropagation();
    },
    handleDragOver: function(e) {
      if (!this.dragging) {
        return;
      }
      e.dataTransfer.dropEffect = 'copy';
      e.preventDefault();
      e.stopPropagation();
    },
    handleDrop: function(e) {
      if (!this.dragging) {
        return;
      }
      this.dragging = false;
      e.dataTransfer.dropEffect = 'copy';
      this.dropDoms = [];
      this.dropData = [];
      this.originPos = {x: 0, y: 0};
      if (this.dropDomList) {
        this.dropDomList.style.top = '-200px';
        this.dropDomList.style.left = '-200px';
      }
    },
    getKeyOfRow(row, index) {
      const rowKey = this.table.rowKey;
      if (rowKey) {
        return getRowIdentity(row, rowKey);
      }
      return index;
    },

    isColumnHidden(index) {
      if (this.fixed === true || this.fixed === 'left') {
        return index >= this.leftFixedCount;
      } else if (this.fixed === 'right') {
        return index < this.columnsCount - this.rightFixedCount;
      } else {
        return (index < this.leftFixedCount) || (index >= this.columnsCount - this.rightFixedCount);
      }
    },

    getRowStyle(row, index) {
      const rowStyle = this.rowStyle;
      if (typeof rowStyle === 'function') {
        return rowStyle.call(null, row, index);
      }
      return rowStyle;
    },

    getRowClass(row, index) {
      const classes = [];

      const rowClassName = this.rowClassName;
      if (typeof rowClassName === 'string') {
        classes.push(rowClassName);
      } else if (typeof rowClassName === 'function') {
        classes.push(rowClassName.call(null, row, index) || '');
      }

      return classes.join(' ');
    },
    validateRowKey: function(row) {
      const rowKey = this.getKeyOfRow(row);
      if (this.firstRowKey) {
        if (rowKey === this.firstRowKey) {
          return false;
        }
      }
      if (this.lastRowKey) {
        if (rowKey === this.lastRowKey) {
          return false;
        }
      }
      return true;
    },
    handleDown(event, row, index, column) {
      if (!this.validateRowKey(row)) {
        return;
      }
      if (this.sortByDrag && column.type === 'index' && event.which === 1) {
        this.dragData = row;
        this.dragIndex = index;
        this.dragItem = event.currentTarget.parentNode;
        this.isDrag = true;
        const _top = this.dragItem.offsetTop - this.dragItem.parentNode.offsetTop;
        this.dragTop = _top + 'px';
        this.preventDefault(event);
      }
    },
    preventDefault(e) {
      e = e || window.event;
      if (e.preventDefault) {
        e.preventDefault();
      } else {
        e.returnvalue = false;
      }
    },
    handleDragDown(event) {
      if (event.which === 1) {
        this.isDrag = true;
        this.preventDefault(event);
      }
    },
    handleDragMove(event) {
      this.mousePosGap.x = event.pageX - this.mousePos.x;
      this.mousePosGap.y = event.pageY - this.mousePos.y;
      this.mousePos.x = event.pageX;
      this.mousePos.y = event.pageY;
      if (this.isDrag) {
        this.preventDefault(event);
        const _top = window.parseInt(document.querySelector('.elx-drag-item').offsetTop) + this.mousePosGap.y;
        const _trTop = this.dragItem.offsetTop - this.dragItem.parentNode.offsetTop;
        if (_top < _trTop - this.dragItem.offsetHeight / 2) {
          if (this.dragIndex - 1 < 0) {
            return;
          }
          this.changeItems = [this.data[this.dragIndex], this.data[this.dragIndex - 1]];
          if (!this.validateRowKey(this.changeItems[1])) {
          } else {
            this.data.splice(this.dragIndex - 1, 1, this.changeItems[0]);
            this.data.splice(this.dragIndex, 1, this.changeItems[1]);
            this.dragIndex = this.dragIndex - 1;
            this.$nextTick(function() {
              this.dragItem = this.dragItem.parentNode.childNodes[this.dragIndex];
            });
            this.dragData = this.data[this.dragIndex];
          }
        }
        if (_top > _trTop + this.dragItem.offsetHeight / 2) {
          if (this.dragIndex + 1 > this.data.length - 1) {
            return;
          }
          this.changeItems = [this.data[this.dragIndex], this.data[this.dragIndex + 1]];
          if (!this.validateRowKey(this.changeItems[1])) {
          } else {
            this.data.splice(this.dragIndex + 1, 1, this.changeItems[0]);
            this.data.splice(this.dragIndex, 1, this.changeItems[1]);
            this.dragIndex = this.dragIndex + 1;
            this.$nextTick(function() {
              this.dragItem = this.dragItem.parentNode.childNodes[this.dragIndex];
            });
            this.dragData = this.data[this.dragIndex];
          }
        }
        this.dragTop = _top + 'px';
      }
    },
    handleDragUp(event) {
      this.isDrag = false;
      this.preventDefault(event);
    },
    handleCellMouseEnter(event, row) {
      const table = this.table;
      const cell = getCell(event);

      if (cell) {
        const column = getColumnByCell(table, cell);
        const hoverState = table.hoverState = {cell, column, row};
        table.$emit('cell-mouse-enter', hoverState.row, hoverState.column, hoverState.cell, event);
      }

      // 判断是否text-overflow, 如果是就显示tooltip
      const cellChild = event.target.querySelector('.cell');
      if (hasClass(cellChild, 'el-tooltip') && cellChild.scrollWidth > cellChild.offsetWidth) {
        const tooltip = this.$refs.tooltip;

        this.tooltipContent = cell.innerText;
        tooltip.referenceElm = cell;
        tooltip.$refs.popper.style.display = 'none';
        tooltip.doDestroy();
        window.tooltip = tooltip;
        this.activateTooltip(tooltip);
      }
    },

    handleCellMouseLeave(event) {
      this.$refs.tooltip.handleClosePopper();
      const cell = getCell(event);
      if (!cell) return;

      const oldHoverState = this.table.hoverState;
      this.table.$emit('cell-mouse-leave', oldHoverState.row, oldHoverState.column, oldHoverState.cell, event);
    },

    handleMouseEnter(index) {
      this.store.commit('setHoverRow', index);
    },

    handleMouseLeave() {
      this.isMouseDown = false;
      this.store.commit('setHoverRow', null);
    },

    handleContextMenu(event, row) {
      this.handleEvent(event, row, 'contextmenu');
    },

    handleDoubleClick(event, row) {
      this.handleEvent(event, row, 'dblclick');
    },

    handleClick(event, row) {
      this.store.commit('setCurrentRow', row);
      this.handleEvent(event, row, 'click');
    },

    handleEvent(event, row, name) {
      const table = this.table;
      const cell = getCell(event);
      let column;
      if (cell) {
        column = getColumnByCell(table, cell);
        if (column) {
          table.$emit(`cell-${name}`, row, column, cell, event);
        }
      }
      table.$emit(`row-${name}`, row, event, column);
    },

    handleExpandClick(row) {
      this.store.commit('toggleRowExpanded', row);
    }
  }
};
