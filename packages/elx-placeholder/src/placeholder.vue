<template>
  <div class="elx-placeholder">
    <span
      class="elx-placeholder-content"
      v-html="text">
    </span>
  </div>
</template>

<script>
  import {t} from 'element-uex/src/locale';
  export default {
    name: 'ElxPlaceholder',
    componentName: 'ElxPlaceholder',

    props: {
      text: {
        type: String,
        default() {
          return t('el.placeholder.emptyText');
        }
      }
    }
  };
</script>

