import React from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import { NewContext } from "../../contexts/NewContext";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
export default function UpdateNewModal() {
  const {
    newState: { newTT },
    showUpdateNew,
    setShowUpdateNew,
    updateNew
  } = useContext(NewContext);

  const [updateNews, setUpdateNews] = useState(newTT);
  useEffect(() => setUpdateNews(newTT), [newTT]);

  const [previewSource, setPreviewSource] = useState();
  const [stateNew, setStateNew] = useState({
    contentNew: EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(newTT.contentNew).contentBlocks)),
  })
  useEffect(()=>setStateNew({
    contentNew: EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(newTT.contentNew).contentBlocks)),
  }),[newTT.contentNew])
  const { titleNew, imageNewUrl,logoSize,logoType,costCar } = updateNews;

  const onChangeUpdateNewForm = (event) =>
    setUpdateNews({
      ...updateNews,
      [event.target.name]: event.target.value,
    });
  const onEditorStateChangeCon = (contentNew) => {
    setStateNew({
      contentNew,
    });
    setUpdateNews({
      ...updateNews,
      contentNew: draftToHtml(convertToRaw(contentNew.getCurrentContent())),
    });
  };
  const { contentNew } = stateNew;
  const handleClose = () => {
    setShowUpdateNew(false);
    setUpdateNews(newTT);
    setPreviewSource();
    setStateNew({
      contentNew: EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(newTT.contentNew).contentBlocks)),
    });
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
      setUpdateNews({
        ...updateNews,
        imageNewUrl: reader.result?reader.result:imageNewUrl
      });
    };
  };
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!previewSource && !imageNewUrl) {
      alert("Vui lòng chọn ảnh cho sản phẩm");
      return
    }
    await updateNew(updateNews);
    handleClose();
  };
  return (
    <>
      <Modal
        show={showUpdateNew}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <i style={{ color: "#0069D9" }} className="fas fa-icons"></i>
            <span className="pl-2"> Sửa thông tin logo </span>
          </Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Form.Group>
              <Row>
                <Col xs={8}>
                <Form.Label htmlFor="desPub">Logo name</Form.Label>
                  <Form.Control
                    type="text"
                    name="titleNew"
                    value={titleNew}
                    onChange={onChangeUpdateNewForm}
                    placeholder="Logo name"
                    required />
                </Col>
                <Col xs={4}>
                <Form.Label htmlFor="desPub">Giá</Form.Label>
                  <Form.Control
                    type="text"
                    name="costCar"
                    value={costCar}
                    onChange={onChangeUpdateNewForm}
                    placeholder="Giá"
                    required />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group >
                {
                    (previewSource||imageNewUrl) && <img src={previewSource||imageNewUrl} className="img-fluid" alt="imgNew"/>
                }
                <Form.File onChange={handleFileInputChange}  style={{height:'100%'}} name="imageNewUrl" className=" btn btn-primary form-control form-control-sm" id ="imgFile" accept="image/gif, image/jpeg, image/png" />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="desPub">Mô tả</Form.Label>
              <Editor
                  editorState={contentNew}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={onEditorStateChangeCon}
                  editorStyle={{height: '300px',border:'1px solid #CED4DA',borderRadius:'0.2em'}}
                  toolbarStyle={{border:'1px solid #CED4DA',borderRadius:'0.2em'}}
              />
            </Form.Group>
            <Form.Label htmlFor="desPub">Kích cỡ file</Form.Label>
            <Form.Group>
                <Form.Control type="text" name="logoSize" value={logoSize} onChange={onChangeUpdateNewForm} placeholder="Kích cỡ file" />
            </Form.Group>
            <Form.Label htmlFor="desPub">Loại Logo</Form.Label>
            <Form.Group>
                <Form.Control type="text" name="logoType" value={logoType} onChange={onChangeUpdateNewForm} placeholder="Loại Logo" />
            </Form.Group>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleSubmitForm}>
              Sửa
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
