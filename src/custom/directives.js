import Vue from 'vue'


Vue.directive('resize', {
    bind(el, binding) {
        let width = '';
        let height = '';

        function isResize() {
            const style = document.defaultView.getComputedStyle(el);
            if (width !== style.width || height !== style.height) {
                binding.value();
            }
            width = style.width;
            height = style.height;
        }

        el.__vueSetInterval__ = setInterval(isResize, 600);
    },
    unbind(el) {
        clearInterval(el.__vueSetInterval__);
    }
});