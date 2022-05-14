import React from "react";
import { Modal, Button, Form, Row, Col, Tab, Nav } from "react-bootstrap";
import { useContext, useState } from "react";
import { ProductContext } from "../../contexts/ProductContext";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import validator from "validator";
export default function AddCarModal() {
  const { showAddCar, setShowAddCar, createProduct } =
    useContext(ProductContext);
  const [previewSource, setPreviewSource] = useState();
  const [stateCar, setStateCar] = useState({
    specicalCar: EditorState.createEmpty(),
  });
  const [stateDesCar, setStateDesCar] = useState({
    descriptionCar: EditorState.createEmpty(),
  });

  const [newCar, setNewCar] = useState({
    nameCar: "",
    imgCarUrl: "",
    specicalCar: "",
    descriptionCar: "",
    seatsCar: "",
    TypeCar: "",
    madeInCar: "",
    sizeCar: "",
    lengthBaseCar: "",
    engineCar: "",
    workCapacityCar: "",
    fuelTypeCar: "",
    fuelCapacityCar: "",
    maxPowerCar: "",
    maxTorqueCar: "",
    gearCar: "",
    driveSystemCar: "",
    suspensionCar: "",
    brakeCar: "",
    powerSteerCar: "",
    plateSizeCar: "",
    lightCar: "",
    consumptionInCar: "",
    consumptionOutCar: "",
    consumptionCar: "",
    costCar: "",
    category: "",
  });
  const {
    nameCar,
    seatsCar,
    madeInCar,
    sizeCar,
    lengthBaseCar,
    engineCar,
    workCapacityCar,
    fuelTypeCar,
    fuelCapacityCar,
    maxTorqueCar,
    gearCar,
    driveSystemCar,
    suspensionCar,
    brakeCar,
    powerSteerCar,
    plateSizeCar,
    lightCar,
    consumptionInCar,
    consumptionOutCar,
    consumptionCar,
    costCar,
    maxPowerCar,
    TypeCar,
    category,
  } = newCar;

  const onChangeNewCarForm = (event) =>
    setNewCar({
      ...newCar,
      [event.target.name]: event.target.value,
    });
  const onEditorStateChange = (specicalCar) => {
    setStateCar({
      specicalCar,
    });
    setNewCar({
      ...newCar,
      specicalCar: draftToHtml(convertToRaw(specicalCar.getCurrentContent())),
    });
  };
  const onEditorStateChangeDes = (descriptionCar) => {
    setStateDesCar({
      descriptionCar,
    });
    setNewCar({
      ...newCar,
      descriptionCar: draftToHtml(
        convertToRaw(descriptionCar.getCurrentContent())
      ),
    });
  };
  const { specicalCar } = stateCar;
  const { descriptionCar } = stateDesCar;
  const handleClose = () => {
    setShowAddCar(false);
    setNewCar({
      nameCar: "",
      imgCarUrl: "",
      specicalCar: "",
      descriptionCar: "",
      seatsCar: "",
      TypeCar: "",
      madeInCar: "",
      sizeCar: "",
      lengthBaseCar: "",
      engineCar: "",
      workCapacityCar: "",
      fuelTypeCar: "",
      fuelCapacityCar: "",
      maxPowerCar: "",
      maxTorqueCar: "",
      gearCar: "",
      driveSystemCar: "",
      suspensionCar: "",
      brakeCar: "",
      powerSteerCar: "",
      plateSizeCar: "",
      lightCar: "",
      consumptionInCar: "",
      consumptionOutCar: "",
      consumptionCar: "",
      costCar: "",
    });
    setPreviewSource();
    setStateCar({
      specicalCar: EditorState.createEmpty(),
    });
    setStateDesCar({
      descriptionCar: EditorState.createEmpty(),
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
      setNewCar({
        ...newCar,
        imgCarUrl: reader.result,
      });
    };
  };
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!previewSource) {
      alert("Vui lòng chọn ảnh cho sản phẩm");
      return;
    }
    if (validator.isEmpty(nameCar)) {
      alert("Bạn chưa nhập tên sản phẩm");
      return;
    }
    if (validator.isEmpty(costCar)) {
      alert("Bạn chưa nhập giá sản phẩm");
      return;
    }
    if (!validator.isDecimal(costCar)) {
      alert("số giá sản phẩm phải là kiểu số");
      return;
    }
    await createProduct(newCar);
    handleClose();
  };


  return (
    <>
      <Modal
        show={showAddCar}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <i style={{ color: "#0069D9" }} className="fas fa-image"></i>
            <span className="pl-2">Thêm sản phẩm mới</span>
          </Modal.Title>
        </Modal.Header>
        <Form>
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Col sm={2}>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="first">Cơ bản</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second">Nâng Cao</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={10}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <Modal.Body>
                      <Form.Group>
                        <Row>
                          <Col>
                            <Form.Control
                              type="text"
                              name="nameCar"
                              value={nameCar}
                              onChange={onChangeNewCarForm}
                              placeholder="Tên sản phẩm"
                              required
                            />
                          </Col>
                          <Col>
                            <Form.Control
                              type="text"
                              name="costCar"
                              value={costCar}
                              onChange={onChangeNewCarForm}
                              placeholder="Giá"
                              required
                            />
                          </Col>
                        </Row>
                      </Form.Group>
                      <Form.Group>
                        <Form.Control
                          as="select"
                          value={category}
                          name='category'
                          onChange={onChangeNewCarForm}
                        >
                          <option>--Vui lòng chọn danh mục--</option>
                          <option value="graphics">Ấn phẩm truyền thông </option>
                          <option value="logo">Nhận diện thương hiệu</option>
                          <option value="print">In ấn</option>
                          <option value="font">Font chữ</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group>
                        {previewSource && (
                          <img
                            src={previewSource}
                            alt="imgCar"
                            className="img-fluid"
                            style={{ height: "300px" }}
                          />
                        )}
                        <Form.File
                          onChange={handleFileInputChange}
                          style={{ height: "100%" }}
                          name="imgCarUrl"
                          className=" btn btn-primary form-control form-control-sm"
                          id="imgFile"
                          accept="image/gif, image/jpeg, image/png"
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label htmlFor="desPub">
                          Nội dung nổi bật (Nội dung này được hiển thị bên cạnh
                          sản phẩm)
                        </Form.Label>
                        <Editor
                          editorState={specicalCar}
                          toolbarClassName="toolbarClassName"
                          wrapperClassName="wrapperClassName"
                          editorClassName="editorClassName"
                          onEditorStateChange={onEditorStateChange}
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
                    </Modal.Body>
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <Modal.Body>
                      <Row>
                        <Col>
                          <Form.Group>
                            <Form.Label htmlFor="desPub">Mô tả</Form.Label>
                            <div
                              style={{
                                border: "1px solid #CED4DA",
                                borderRadius: "0.2em",
                              }}
                            >
                              <Editor
                                editorState={descriptionCar}
                                toolbarClassName="toolbarClassName"
                                wrapperClassName="wrapperClassName"
                                editorClassName="editorClassName"
                                onEditorStateChange={onEditorStateChangeDes}
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
                            </div>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group>
                            <Form.Control
                              type="text"
                              name="engineCar"
                              value={engineCar}
                              onChange={onChangeNewCarForm}
                              placeholder="Người tạo"
                            />
                          </Form.Group>
                          <Form.Group>
                            <Form.Control
                              type="text"
                              name="TypeCar"
                              value={TypeCar}
                              onChange={onChangeNewCarForm}
                              placeholder="Loại tương thích"
                            />
                          </Form.Group>
                          <Form.Group>
                            <Form.Control
                              type="text"
                              name="madeInCar"
                              value={madeInCar}
                              onChange={onChangeNewCarForm}
                              placeholder="Link xem thêm"
                            />
                          </Form.Group>
                          <Form.Group>
                            <Form.Control
                              type="text"
                              name="sizeCar"
                              value={sizeCar}
                              onChange={onChangeNewCarForm}
                              placeholder="File Size"
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </Modal.Body>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
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
