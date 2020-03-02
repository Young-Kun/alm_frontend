import html2canvas from "html2canvas";
import JsPDF from "jspdf";


export default {
    install(Vue) {
        Vue.prototype.$getPdf = (id, filename) => {
            html2canvas(document.querySelector(`#${id}`), {
                allowTaint: true,
                taintTest: false,
                useCORS: true,
                dpi: window.devicePixelRatio * 4, //将分辨率提高到特定的DPI 提高四倍
                scale: 4 //按比例增加分辨率
            }).then((canvas) => {
                    let pageWidth = canvas.width;
                    let pageHeight = pageWidth / 16 * 9;
                    let pageData = canvas.toDataURL('image/jpeg', 1.0);
                    let PDF = new JsPDF('l', 'pt', [pageWidth, pageHeight]);
                    PDF.addImage(pageData, 'JPEG', 0, 0, pageWidth, pageHeight);
                    PDF.save(filename + '.pdf')
                }
            )
        }
    }
}