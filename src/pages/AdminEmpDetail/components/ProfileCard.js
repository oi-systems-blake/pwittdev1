import React from 'react'

export default function ProfileCard({...props}) {
  let profileData = props.aeinfo
  console.log(profileData)
    return (
    <div className="profile-card">
    <div className="profile-card-header">
      <b>{profileData.fields["Preferred Name"]}</b>
    </div>
    <div className="Profile-card-row">
      <b>First Name</b>
      <div className="name-field">{profileData.fields["First Name"]}</div>
    </div>
    <div className="Profile-card-row">
      <b>Last Name</b>
      <div className="name-field">{profileData.fields["Last Name"]}</div>
    </div>
    <div className="Profile-card-row">
      <b>Manager</b>
      <div className="name-field">{profileData.fields["Supervisor First Name"]}</div>
    </div>
    <div className="Profile-card-row">
      <b>Phone Number</b>
      <div className="name-field">{profileData.fields.Mobile}</div>
    </div>
    <div className="Profile-card-row">
      <b>Email</b>
      <div className="name-field">{profileData.fields["Primary Email"]}</div>
    </div>
    <div className="Profile-card-row">
      <b>Clock Status</b>
      <div className="name-field">From Parent</div>
    </div>
  </div>
  )
}

