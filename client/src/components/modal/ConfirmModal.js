import React from 'react'
import {Modal,Button} from 'react-bootstrap';

export default function ConfirmModal(props) {

    return (
        <>
          <Modal show={props.show} onHide={props.onClose}>
            <Modal.Header closeButton>
              <Modal.Title style={{fontWeight:'bolder'}}>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{fontSize:'18px',fontWeight:'bold',textAlign:'center'}}>{props.content}</Modal.Body>
            <Modal.Footer>
              <Button style={{fontWeight:'bolder'}} variant="primary" onClick={props.onClick}>
                Đồng ý
              </Button>
              <Button style={{fontWeight:'bolder'}} variant="danger" onClick={props.onClose}>
                Quay lại
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
}
