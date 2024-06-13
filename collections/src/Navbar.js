//using bootstrap boilerplate

import React from 'react'

export const Navbar = () => {
  return (
    <nav
      className='navbar navbar-expand-lg bg-dark border-bottom border-body'
      data-bs-theme='dark'
    >
      <div class='container-fluid'>
        <a class='navbar-brand' href='/'>
          Home
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNavAltMarkup'
          aria-controls='navbarNavAltMarkup'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
          <div className='navbar-nav'>
            <a className='nav-link' href='/collections'>
              Add an Item
            </a>
            <a className='nav-link' href='/viewItems'>
              View Items
            </a>
          </div>
          <div className='collapse navbar-collapse justify-content-end'>
            <div className='navbar-nav'>
              <a className='nav-link' href='/signOut'>
                Sign Out
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
