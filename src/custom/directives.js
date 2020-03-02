import Vue from 'vue'


Vue.directive('resize', {
    bind(el, binding) {
        let width = '';
        let height = '';

        function isResize() {
            const style = document.defaultView.getComputedStyle(el);
            if (parseInt(width) > parseInt(style.width) + 20 || parseInt(height) > parseInt(style.height) + 20
                || parseInt(width) < parseInt(style.width) - 20 || parseInt(height) < parseInt(style.height) - 20) {
                console.log(height);
                console.log(style.height);

                binding.value();
            }
            width = style.width;
            height = style.height;
        }

        el.__vueSetInterval__ = setInterval(isResize, 300);
    },
    unbind(el) {
        clearInterval(el.__vueSetInterval__);
    }
});