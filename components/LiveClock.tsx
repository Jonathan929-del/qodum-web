'use client'
import React from 'react'
import Clock from 'react-live-clock';

const LiveClock = () => {
  return (
    <Clock format={'LTS'} ticking={true}  />
  )
}

export default LiveClock;