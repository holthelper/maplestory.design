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
        <img src="/finalicon.svg" className="intro-logo"/><span onClick={this.closeModal.bind(this)} className="btn bg-green text-white right intro-dismiss"><i className="fa fa-check"></i> I agree to the disclaimer.</span>
        <h1>
          <b>MapleStory:</b> Design
          <br/>
          <span className="modal-desc">The <b>unofficial</b> MapleStory simulator and designer.</span>
        </h1>
        <h3>Have feedback or want to report a bug?</h3>
        <p>Let us know on our <a href="https://discord.gg/D65Grk9">Discord</a> or by email at support@crr.io.</p>
        <h3>Latest Updates</h3>
        <p>Visit our <a href="//blog.crr.io">blog</a> for more more information about our latest updates, bug fixes, and other official Crrio news.</p>
        <h3>Disclaimer</h3>
        <p style={{"margin-right":"170px"}}><span className="avatar-box">{this.getRandomAvatar()}</span>All assets and resources regarding MapleStory thereof are the sole property of <a href="//nexon.net">Nexon</a> and applies to their Terms of Use. By using this service, you agree to respect all copyrights and to not use any assets commercially without permission from Nexon.</p>
        <p style={{"margin-right":"170px"}}>We are not an official MapleStory server nor fansite; <i>we provide this service for free in the spirit of free-to-play gaming.</i></p>
      </Modal>
    )
  }

  closeModal () {
    this.props.onSetModalOpen(false)
  }

  getRandomAvatar () {
    const knownAvatars = [
      '2010/1702342,1072368,1052167,1052167,1002185,1012055,1022043,38006,20544', // Andy (Crrio)
      '2000/1702722,1073181,1053109,1053109,1004862,33005,21544', // Tyler Corsair (Crrio)
      '2000/1052923,1052923,1002186,33515,21136' // Andy (Pink Bean's developer)
    ]

    const chosenAvatar = knownAvatars[Math.floor(Math.random() * knownAvatars.length)]

    return (<img src={`https://labs.maplestory.io/api/character/center/${chosenAvatar}`} alt={`avatar`} />)
  }
}

export default IntroModal
