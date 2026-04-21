import React from 'react'

const SideBar = () => {
  return (
     <aside className="sidebar">
      <div className="logo">⚡</div>

      <div className="sidebar-bottom">
        <button className="theme-toggle">🌙</button>
        <img
          src="https://i.pravatar.cc/40"
          alt="user avatar"
          className="avatar"
        />
      </div>
    </aside>
  )
}

export default SideBar