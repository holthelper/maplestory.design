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
        <h1>
          <b>MapleStory:</b> Design
          <span onClick={this.closeModal.bind(this)} className="right"><i className="fa fa-times"></i></span>
          <br/>
          <span className="modal-desc">The unofficial MapleStory simulator and designer.</span>
        </h1>
        <h3>Have feedback or want to report a bug?</h3>
        <p>Let us know on our <a href="https://discord.gg/D65Grk9">Discord</a> or by email at support@crr.io.</p>
        <h3>Changelog</h3>
        <p>Visit our <a href="//blog.crr.io">blog</a> for more more information about our latest updates, bug fixes, and other Crrio news.</p>
        <h3>Disclaimer</h3>
        <p><span className="avatar-box">{this.getRandomAvatar()}</span>All assets and resources regarding MapleStory thereof are the sole property of <a href="//nexon.net">NEXON</a> and applies to their Terms of Use. By using this service, you agree to respect all copyrights and to not use any assets commercially without permission from Nexon.</p>
        <p>We are not an official MapleStory server nor fansite; we provide this service for free in the spirit of free-to-play gaming.</p>
      </Modal>
    )
  }

  closeModal () {
    this.props.onSetModalOpen(false)
  }

  getRandomAvatar () {
    const knownAvatars = [
      '2010/1702342,1072368,1052167,1052167,1002185,1012055,1022043,38006,20544',
      '2000/1702722,1073181,1053109,1053109,1004862,33005,21544',
      '2000/1052923,1052923,1002186,33515,21136'
    ]

    const chosenAvatar = knownAvatars[Math.floor(Math.random() * knownAvatars.length)]

    return (<img src={`https://labs.maplestory.io/api/character/center/${chosenAvatar}`} />)
  }
}

export default IntroModal
