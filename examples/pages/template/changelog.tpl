<template>
  <div class="page-changelog">
    <div class="heading">
      <el-button class="fr">
        <a href="https://github.com/ElemeFE/element/releases" target="_blank">Github Releases</a>
      </el-button>
      <%= 1 >
    </div>
    <ul class="timeline" ref="timeline">
    </ul>
    <change-log ref="changeLog"></change-log>
  </div>
</template>
<script>
  import ChangeLog from '../../../CHANGELOG.<%= 2 >.md';
  export default {
    components: {
      ChangeLog
    },
    data() {
      return {
        count: 3
      };
    },
    mounted() {
      const changeLog = this.$refs.changeLog;
      const changeLogNodes = changeLog.$el.children;
      let a = changeLogNodes[1].querySelector('a');
      a && a.remove();
      let release = changeLogNodes[1].textContent.trim();
      let fragments = `<li><h3><a href="https://github.com/ElemeFE/element/releases/tag/v${release}" target="_blank">${release}</a></h3>`;

      for (let len = changeLogNodes.length, i = 2; i < len; i++) {
        let node = changeLogNodes[i];
        a = changeLogNodes[i].querySelector('a');
        a && a.remove();
        if (node.tagName !== 'H3') {
          fragments += changeLogNodes[i].outerHTML;
        } else {
          release = changeLogNodes[i].textContent.trim();
          fragments += `</li><li><h3><a href="https://github.com/ElemeFE/element/releases/tag/v${release}" target="_blank">${release}</a></h3>`;
        }
      }
      fragments = fragments.replace(/#(\d+)/g, '<a href="https://github.com/ElemeFE/element/issues/$1" target="_blank">#$1</a>');
      fragments = fragments.replace(/@(\w+)/g, '<a href="https://github.com/$1" target="_blank">@$1</a>');
      this.$refs.timeline.innerHTML = `${fragments}</li>`;

      changeLog.$el.remove();
    }
  };
</script>
