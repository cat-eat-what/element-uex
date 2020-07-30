import CodeMirror from 'codemirror';

(function(mod) {
  mod(CodeMirror);
})(function(CodeMirror) {
  'use strict';
  if (!CodeMirror) {
    return;
  }
  CodeMirror.extendMode('css', {
    commentStart: '/*',
    commentEnd: '*/',
    newlineAfterToken: function(type, content) {
      return /^[;{}]$/.test(content);
    }
  });

  CodeMirror.extendMode('javascript', {
    commentStart: '/*',
    commentEnd: '*/',
    // FIXME semicolons inside of for
    newlineAfterToken: function(type, content, textAfter, state) {
      if (this.jsonMode) {
        return /^[\[,{]$/.test(content) || /^}/.test(textAfter);
      } else {
        if (content === ';' && state.lexical && state.lexical.type === ')') return false;
        return /^[;{}]$/.test(content) && !/^;/.test(textAfter);
      }
    }
  });

  CodeMirror.extendMode('xml', {
    commentStart: '<!--',
    commentEnd: '-->',
    newlineAfterToken: function(type, content, textAfter) {
      return type === 'tag' && />$/.test(content) || /^</.test(textAfter);
    }
  });

  // Comment/uncomment the specified range
  CodeMirror.defineExtension('commentRange', function(isComment, from, to) {
    const cm = this;
    const curMode = CodeMirror.innerMode(cm.getMode(), cm.getTokenAt(from).state).mode;
    cm.operation(function() {
      if (isComment) { // Comment range
        cm.replaceRange(curMode.commentEnd, to);
        cm.replaceRange(curMode.commentStart, from);
        if (from.line === to.line && from.ch === to.ch) {
          cm.setCursor(from.line, from.ch + curMode.commentStart.length); // An empty comment inserted - put cursor inside
        }
      } else { // Uncomment range
        let selText = cm.getRange(from, to);
        const startIndex = selText.indexOf(curMode.commentStart);
        const endIndex = selText.lastIndexOf(curMode.commentEnd);
        if (startIndex > -1 && endIndex > -1 && endIndex > startIndex) {
          // Take string till comment start
          selText = selText.substr(0, startIndex) +
          // From comment start till comment end
          selText.substring(startIndex + curMode.commentStart.length, endIndex) +
          // From comment end till string end
          selText.substr(endIndex + curMode.commentEnd.length);
        }
        cm.replaceRange(selText, from, to);
      }
    });
  });

  // Applies automatic mode-aware indentation to the specified range
  CodeMirror.defineExtension('autoIndentRange', function(from, to) {
    const cmInstance = this;
    this.operation(function() {
      for (let i = from.line; i <= to.line; i++) {
        cmInstance.indentLine(i, 'smart');
      }
    });
  });

  // Applies automatic formatting to the specified range
  CodeMirror.defineExtension('autoFormatRange', function(from, to) {
    const cm = this;
    const outer = cm.getMode();
    const text = cm.getRange(from, to).split('\n');
    const state = CodeMirror.copyState(outer, cm.getTokenAt(from).state);
    const tabSize = cm.getOption('tabSize');
    let out = '';
    let lines = 0;
    let atSol = from.ch === 0;
    function newline() {
      out += '\n';
      atSol = true;
      ++lines;
    }

    for (let i = 0; i < text.length; ++i) {
      const stream = new CodeMirror.StringStream(text[i], tabSize);
      while (!stream.eol()) {
        const inner = CodeMirror.innerMode(outer, state);
        const style = outer.token(stream, state);
        const cur = stream.current();
        stream.start = stream.pos;
        if (!atSol || /\S/.test(cur)) {
          out += cur;
          atSol = false;
        }
        if (!atSol && inner.mode.newlineAfterToken && inner.mode.newlineAfterToken(style, cur, stream.string.slice(stream.pos) || text[i + 1] || '', inner.state)) {
          newline();
        }
      }
      if (!stream.pos && outer.blankLine) {
        outer.blankLine(state);
      }
      if (!atSol) {
        newline();
      }
    }

    cm.operation(function() {
      cm.replaceRange(out, from, to);
      for (let cur = from.line + 1, end = from.line + lines; cur <= end; ++cur) {
        cm.indentLine(cur, 'smart');
      }
      cm.setSelection(from, cm.getCursor(false));
    });
  });
  function searchOverlay(query, caseInsensitive) {
    if (typeof query === 'string') {
      query = new RegExp(query.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&'), caseInsensitive ? 'gi' : 'g');
    } else if (!query.global) {
      query = new RegExp(query.source, query.ignoreCase ? 'gi' : 'g');
    }
    return {token: function(stream) {
      query.lastIndex = stream.pos;
      const match = query.exec(stream.string);
      if (match && match.index === stream.pos) {
        stream.pos += match[0].length || 1;
        return 'searching';
      } else if (match) {
        stream.pos = match.index;
      } else {
        stream.skipToEnd();
      }
    }};
  }

  function SearchState() {
    this.posFrom = this.posTo = this.lastQuery = this.query = null;
    this.overlay = null;
  }

  function getSearchState(cm) {
    return cm.state.search || (cm.state.search = new SearchState());
  }

  function queryCaseInsensitive(query) {
    return typeof query === 'string' && query === query.toLowerCase();
  }

  function getSearchCursor(cm, query, pos) {
    // Heuristic: if the query string is all lowercase, do a case insensitive search.
    return cm.getSearchCursor(query, pos, {caseFold: queryCaseInsensitive(query), multiline: true});
  }

  function parseString(string) {
    return string.replace(/\\(.)/g, function(_, ch) {
      if (ch === 'n') {
        return '\n';
      }
      if (ch === 'r') {
        return '\r';
      }
      return ch;
    });
  }

  function parseQuery(query) {
    const isRE = query.match(/^\/(.*)\/([a-z]*)$/);
    if (isRE) {
      try {
        query = new RegExp(isRE[1], isRE[2].indexOf('i') === -1 ? '' : 'i');
      } catch (e) {} // Not a regular expression after all, do a string search
    } else {
      query = parseString(query);
    }
    if (typeof query === 'string' ? query === '' : query.test('')) {
      query = /x^/;
    }
    return query;
  }

  function startSearch(cm, state, query) {
    state.queryText = query;
    state.query = parseQuery(query);
    cm.removeOverlay(state.overlay, queryCaseInsensitive(state.query));
    state.overlay = searchOverlay(state.query, queryCaseInsensitive(state.query));
    cm.addOverlay(state.overlay);
    if (cm.showMatchesOnScrollbar) {
      if (state.annotate) { state.annotate.clear(); state.annotate = null; }
      state.annotate = cm.showMatchesOnScrollbar(state.query, queryCaseInsensitive(state.query));
    }
  }

  function doSearch(cm, data, cmd, rev, persistent, immediate) {
    const state = getSearchState(cm);
    const query = data.search;
    if (state.query) return findNext(cm, rev);
    let q = cm.getSelection() || state.lastQuery;
    if (q instanceof RegExp && q.source === 'x^') {
      q = null;
    }
    if (persistent && cm.openDialog) {
      const searchNext = function(query, event) {
        if (!query) return;
        if (query !== state.queryText) {
          startSearch(cm, state, query);
          state.posFrom = state.posTo = cm.getCursor();
        }
      };
      if (cmd === 'findNext' || cmd === 'findPrev' || cmd === 'findPersistentNext' || cmd === 'findPersistentPrev') {
        startSearch(cm, getSearchState(cm), query);
        cm.execCommand(cmd);
      } else if (cmd === 'find' || cmd === 'findPersistent') {
        searchNext(query);
      }
      if (immediate && q) {
        startSearch(cm, state, q);
        findNext(cm, rev);
      }
    } else {
      if (query && !state.query) {
        cm.operation(function() {
          startSearch(cm, state, query);
          state.posFrom = state.posTo = cm.getCursor();
          findNext(cm, rev);
        });
      }
    }
  }

  function findNext(cm, rev, callback) {
    cm.operation(function() {
      const state = getSearchState(cm);
      let cursor = getSearchCursor(cm, state.query, rev ? state.posFrom : state.posTo);
      if (!cursor.find(rev)) {
        cursor = getSearchCursor(cm, state.query, rev ? CodeMirror.Pos(cm.lastLine()) : CodeMirror.Pos(cm.firstLine(), 0));
        if (!cursor.find(rev)) return;
      }
      cm.setSelection(cursor.from(), cursor.to());
      cm.scrollIntoView({from: cursor.from(), to: cursor.to()}, 20);
      state.posFrom = cursor.from(); state.posTo = cursor.to();
      if (callback) {
        callback(cursor.from(), cursor.to());
      }
    });
  }

  function clearSearch(cm) {
    cm.operation(function() {
      const state = getSearchState(cm);
      state.lastQuery = state.query;
      if (!state.query) {
        return;
      }
      state.query = state.queryText = null;
      cm.removeOverlay(state.overlay);
      if (state.annotate) {
        state.annotate.clear();
        state.annotate = null;
      }
    });
  }

  function replaceAll(cm, data) {
    const query = data.search;
    const text = data.replace;
    cm.operation(function() {
      for (let cursor = getSearchCursor(cm, query); cursor.findNext();) {
        if (typeof query !== 'string') {
          const match = cm.getRange(cursor.from(), cursor.to()).match(query);
          cursor.replace(text.replace(/\$(\d)/g, function(_, i) {return match[i];}));
        } else cursor.replace(text);
      }
    });
  }

  function replace(cm, data) {
    if (cm.getOption('readOnly')) {
      return;
    }
    const query = parseQuery(data.search);
    const text = parseString(data.replace);
    clearSearch(cm);
    let cursor = getSearchCursor(cm, query, cm.getCursor('from'));
    const cursorPointer = function() {
      const start = cursor.from();
      let match;
      if (!(match = cursor.findNext())) {
        cursor = getSearchCursor(cm, query);
        if (!(match = cursor.findNext()) || (start && cursor.from().line === start.line && cursor.from().ch === start.ch)) {
          return;
        }
      }
      cm.setSelection(cursor.from(), cursor.to());
      cm.scrollIntoView({from: cursor.from(), to: cursor.to()});
      return match;
    };
    const advance = function() {
      const match = cursorPointer();
      doReplace(match);
      cursorPointer();
    };
    const doReplace = function(match) {
      cursor.replace(typeof query === 'string' ? text : text.replace(/\$(\d)/g, function(_, i) {return match[i];}));
    };
    advance();
  }
  CodeMirror.extends = {};
  CodeMirror.extends.find = function(cm, data, cmd) {clearSearch(cm); doSearch(cm, data, cmd);};
  CodeMirror.extends.findPersistent = function(cm, data, cmd) {clearSearch(cm); doSearch(cm, data, cmd, false, true);};
  CodeMirror.extends.findPersistentNext = function(cm, data, cmd) {doSearch(cm, data, cmd, false, true, true);};
  CodeMirror.extends.findPersistentPrev = function(cm, data, cmd) {doSearch(cm, data, cmd, true, true, true);};
  CodeMirror.extends.findNext = function(cm) {doSearch(cm);};
  CodeMirror.extends.findPrev = function(cm, data, cmd) {doSearch(cm, data, cmd, true);};
  CodeMirror.extends.clearSearch = function(cm) {clearSearch(cm);};
  CodeMirror.extends.replace = function(cm, data, cmd) {replace(cm, data);};
  CodeMirror.extends.replaceAll = function(cm, data, cmd) {replaceAll(cm, data, cmd, true);};
  const define = define;
  if (typeof define === 'function' && define.amd) {
    define('CodeMirror', [], function() {
      return CodeMirror;
    });
  }
});
