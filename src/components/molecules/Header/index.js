import React, { Component } from 'react'

import './style.less'

export class Header extends Component {
  render() {
    const { userLocation, error } = this.props
    return (
      <header className="app-header">
        <h1>
          {userLocation ? (
            <div>
              {userLocation.city}, {userLocation.state}
            </div>
          ) : (
              (
                'Buscando localidade...'
              )
            )}
        </h1>
      </header>
    )
  }
}
