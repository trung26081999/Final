import React from 'react'
import PropTypes from 'prop-types'
import FooterContent from './footer-content/FooterContent'

FooterLayout.propTypes = {
  children: PropTypes.element,
}

export default function FooterLayout(props) {
  const { children } = props

  return (
    <>
      {children}
      <FooterContent />
    </>
  )
}
