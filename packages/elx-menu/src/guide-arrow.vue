<template>
  <div class="elx-guide-arrow">
    <svg
      id="guide-arrow-svg"
      style="width: 150px; height: 26px" >
      <g transform="scale(0.8) translate(0,-15)">
        <path
          stroke-width="0"
          fill="white"
          d="M 0 18 L 24 0 L 136 0 A 5 5, 0, 0, 1, 141 5 L 141 31 A 5 5, 0, 0, 1, 136 36 L 24 36 ">
        </path>
        <path
          stroke-width="0"
          fill="#116edb"
          d="M 10 18 L 26 6 L 132 6 A 5 5, 0, 0, 1, 137 11 L 137 25 A 5 5,0, 0, 1, 132 30 L 26 30 ">
        </path>
        <animateMotion
          id="animatePath"
          path="M 0 10 A 2 2,0,0,1,4 10 A 2 2,0,0,1,0 10"
          begin="0s"
          dur="1.3s"
          repeatCount="indefinite"
        />
        <animateTransform
          id="enlarge"
          attributeName="transform"
          begin="indefinite"
          dur="0.5s"
          type="scale"
          from="0.8"
          to="0.9"
          fill="freeze"
        />
        <animateTransform
          id="narrow"
          attributeName="transform"
          begin="indefinite"
          dur="0.8s"
          type="scale"
          from="0.9"
          to="0.8"
          fill="freeze"
        />
      </g>
    </svg>
  </div>
</template>

<script>
  import Popper from 'element-uex/src/utils/vue-popper';

  export default {
    name: 'GuideArrow',
    componentName: 'GuideArrow',
    mixins: [Popper],
    props: {
      placement: {
        default: 'right'
      },
      visibleArrow: {
        default: true
      },
      appendToBody: {
        default: false
      },
      popperOptions: {
        default() {
          return {
            boundariesPadding: 10,
            gpuAcceleration: false
          };
        }
      },
      visible: Boolean
    },
    data() {
      return {
        referenceElm: null,
        popperElm: null
      };
    },
    methods: {
      addEvent(element, type, handler) {
        if (element.addEventListener) {
          element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
          element.attachEvent('on' + type, function() {
            handler.call(element);
          });
        } else {
          element['on' + type] = handler;
        }
      },
      setReferenceElm(el) {
        this.referenceElm = el;
      }
    },
    created() {
    },
    mounted() {
      this.$parent.popperElm = this.popperElm = this.$el;
      this.$on('updatePopper', this.updatePopper);
      this.$on('destroyPopper', this.destroyPopper);
    }
  };
</script>

