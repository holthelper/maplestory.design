import React, { Component } from 'react'
import './index.css'
import Modal from 'react-modal'

class IntroModal extends Component {
  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        className={{
          base: 'intro-modal',
          afterOpen: 'intro-modal-opened',
        }}
        overlayClassName={{
          base: 'intro-modal-overlay',
          afterOpen: 'intro-modal-overlay-opened'
        }}>
        <span onClick={this.closeModal.bind(this)}>Close</span>
      </Modal>
    )
  }

  closeModal () {
    this.props.onSetModalOpen(false)
  }
}

export default IntroModal
