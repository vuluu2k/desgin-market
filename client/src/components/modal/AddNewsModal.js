import React from "react";
import { Modal, Button, Form, Row, Col} from "react-bootstrap";
import { useContext, useState } from "react";
import { NewContext } from "../../contexts/NewContext";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
export default function AddNewsModal() {
  const { showAddNew, setShowAddNew, createNew } = useContext(NewContext);
  const [previewSource, setPreviewSource] = useState();
  const [stateNew, setStateNew] = useState({
    contentNew: EditorState.createEmpty(),
  })

  const [News, setNews] = useState({
    titleNew: '',
    contentNew: '',
    imageNewUrl: '',
    imageNewId: '',
    logoSize: '',
    logoType: '',
    costCar: ''
  })
  const { titleNew ,logoSize,logoType,costCar}  = News;

  const onChangeNewForm = (event) => setNews({
      ...News,
      [event.target.name]: event.target.value,
    })
  const onEditorStateChangeCon = (contentNew) => {
    setStateNew({
      contentNew,
    });
    setNews({
      ...News,
      contentNew: draftToHtml(convertToRaw(contentNew.getCurrentContent()))
    });
  };
  const { contentNew } = stateNew;
  const handleClose = () => {
    setShowAddNew(false);
    setNews({
      titleNew: '',
      contentNew: '',
      imageNewUrl: '',
      imageNewId: '',
      logoSize: '',
      logoType: '',
      costCar:''
    });
    setPreviewSource();
    setStateNew({
      contentNew: EditorState.createEmpty(),
    })
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0]
    previewFile(file);
  };
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result)
      setNews({
        ...News,
        imageNewUrl: reader.result
      });
    };
  };
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!previewSource) {
      alert("Vui lòng chọn ảnh cho sản phẩm")
      return
    }
    await createNew(News);
    handleClose();
  };
  return (
    <>
      <Modal
        show={showAddNew}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <i style={{ color: "#0069D9" }} className="fas fa-icons">
              
            </i>
            <span className="pl-2"> Thêm Logo </span>
          </Modal.Title>
        </Modal.Header>
        <Form>
            <Modal.Body>
              <Form.Group>
                <Row>
                  <Col xs={8}>
                    <Form.Control
                      type="text"
                      name="titleNew"
                      value={titleNew}
                      onChange={onChangeNewForm}
                      placeholder="Logo name"
                      required
                    />
                  </Col>
                  <Col xs={4}>
                    <Form.Control
                      type="text"
                      name="costCar"
                      value={costCar}
                      onChange={onChangeNewForm}
                      placeholder="Giá logo"
                      required
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group>
                
                {previewSource && (
                  <img
                    src={previewSource}
                    alt="imgNew"
                    className="img-fluid"
                    style={{ height: "300px" }}
                  />
                )}
                <Form.File
                  onChange={handleFileInputChange}
                  style={{ height: "100%" }}
                  name="imageNewUrl"
                  className=" btn btn-primary form-control form-control-sm"
                  id="imgFile"
                  accept="image/gif, image/jpeg, image/png"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="desPub">
                  Mô tả
                </Form.Label>
                <Editor
                  editorState={contentNew}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={onEditorStateChangeCon}
                  editorStyle={{
                    height: "300px",
                    border: "1px solid #CED4DA",
                    borderRadius: "0.2em",
                  }}
                  toolbarStyle={{
                    border: "1px solid #CED4DA",
                    borderRadius: "0.2em",
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Row>
                  <Col>
                    <Form.Control
                      type="text"
                      name="logoSize"
                      value={logoSize}
                      onChange={onChangeNewForm}
                      placeholder="Kich cỡ file"
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group>
                <Row>
                
                
                  <Col>
                    <Form.Control
                      type="text"
                      name="logoType"
                      value={logoType}
                      onChange={onChangeNewForm}
                      placeholder="Loại Logo"
                      
                    />
                  </Col>
                </Row>
              </Form.Group>
              
             
              
            </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleSubmitForm}>
              Thêm
            </Button>
            <Button variant="danger" onClick={handleClose}>
              Quay lại
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
