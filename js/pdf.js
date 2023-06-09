jsPdfDownload(){
            let pdfName = "测试";
            let id = "resultTable";
            var target = document.getElementById(id);
            target.style.background = "#FFFFFF";
            if(pdfName==''||pdfName==undefined) pdfName= getNowFormatDate();

            html2canvas(target, {
                onrendered:(canvas) => {
                    var contentWidth = canvas.width;
                    var contentHeight = canvas.height;

                    //一页pdf显示html页面生成的canvas高度;
                    var pageHeight = contentWidth / 592.28 * 841.89;
                    //未生成pdf的html页面高度
                    var leftHeight = contentHeight;
                    //页面偏移
                    var position = 0;
                    //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
                    var imgWidth = 555.28;//595.28//左右边距20
                    var imgHeight = 552.28/contentWidth * contentHeight;//左右边距20

                    var pageData = canvas.toDataURL('image/jpeg', 1.0);

                    var pdf = new jsPDF('', 'pt', 'a4');

                    //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
                    //当内容未超过pdf一页显示的范围，无需分页
                    if (leftHeight < pageHeight) {
                        pdf.addImage(pageData, 'JPEG', 20, 0, imgWidth, imgHeight );//左右边距20
                    } else {
                        while(leftHeight > 0) {
                            pdf.addImage(pageData, 'JPEG', 20, position, imgWidth, imgHeight)//左右边距20
                            leftHeight -= pageHeight;
                            position -= 841.89;
                            //避免添加空白页
                            if(leftHeight > 0) {
                                pdf.addPage();
                            }
                        }
                    }
                    pdf.save(pdfName+".pdf");
                }
            })
        }
