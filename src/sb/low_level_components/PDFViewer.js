import React, {useState, useRef } from "react";
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { usePdf } from '@mikecousins/react-pdf';

const PDFViewer = props => {
   const { PDFOverlayShown, hidePDFOverlay, result } = props;
   const [page, setPage] = useState(1);
   const canvasRef = useRef(null);
  
   const { pdfDocument, pdfPage } = usePdf({
      file: result.url,
      page,
      canvasRef,
   });
  
   const singlePage = pdfDocument && pdfDocument.numPages === 1;

   return (
      <Modal 
         isOpen={PDFOverlayShown} 
         toggle={hidePDFOverlay}
         size="lg"
         className="pdf-modal"
      >  
         <ModalHeader toggle={hidePDFOverlay}>
            {result.filename}&nbsp;
            <a href={result.url} target="_blank" className="open-in-new-tab">
               <sup className="fa-solid fa-arrow-up-right-from-square" />
            </a>
         </ModalHeader>
         <ModalBody className="text-center py-1">
            {
               !pdfDocument && 
                  <div className="search-spinner text-center my-5">
                     <i className="fa fa-3x fa-spinner fa-spin"/>
                  </div>
            }
            <canvas ref={canvasRef} />
        </ModalBody>
        {
            Boolean(pdfDocument && pdfDocument.numPages) && (            
                <ModalFooter className="justify-content-center py-1">
                    <nav className="width-100">
                        <ul className="d-flex align-items-center justify-content-center p-0 mb-0">
                            {
                              !singlePage &&
                                 <li className="previous mr-3">
                                    <button type="button" className="btn" disabled={page === 1} onClick={() => setPage(page - 1)}>
                                       <span className="fa-solid fa-chevron-left" />
                                          <span className="sr-only">Previous</span>
                                    </button>
                                 </li>
                            }
                            <li>
                                Page {page} of {pdfDocument.numPages}
                            </li>
                            {
                                !singlePage &&
                                    <li className="next ml-3">
                                        <button type="button" className="btn" disabled={page === pdfDocument.numPages} onClick={() => setPage(page + 1)}>
                                            <span className="fa-solid fa-chevron-right" />
                                            <span className="sr-only">Next</span>
                                        </button>
                                    </li>
                            }
                        </ul>
                    </nav>
                </ModalFooter>
            )
        }
      </Modal>
    );
  };


export default PDFViewer;

PDFViewer.propTypes = {
  result: PropTypes.object,
  PDFOverlayShown: PropTypes.bool,
  hidePDFOverlay: PropTypes.func
};