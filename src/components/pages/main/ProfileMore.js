import React, { useRef } from 'react';
import LinkIcon from '@material-ui/icons/Link';
import { Redirect } from 'react-router';
import { dropbox, setToken$, token$, useObservable, state$ } from '../../../utilities/store';


export default function ProfileMore() {
  const { profile } = useObservable(state$);
  const { userSpace } = useObservable(state$);
  const refInput = useRef(null);

  // Copies referral link to clipboard
  // Input field needed for the execCommand
  // Dummy input field is positioned 1000 pixels above page top
  function copyToClipboard(e) {
    refInput.current.select();
    document.execCommand('copy')
  };

  // Logs out user by setting local token to <null> and revokes token from Dropbox API
  function logoutUser() {
    setToken$(null);
    dropbox.authTokenRevoke();
  }

  // userSpace values are defined in bytes therefore we need to make sure they are correctly formatted
  // FUNCTION: userSpaceFormatting(), converts space values to a more user friendly format
  function userSpaceFormatting(){
    const kb = 1e3;
    const mb = 1e6;
    const gb = 1e9;
    const tb = 1e12;
    const maxSpaceDecimalized = userSpace.allocation.allocated / gb;
    const maxSpaceFormatted = Math.round((maxSpaceDecimalized + Number.EPSILON) * 1) / 1 + " GB";

    if (userSpace.used < kb) {
      return userSpace.used + " bytes of " + maxSpaceFormatted + " used";
    } else if (userSpace.used < mb && userSpace.used > kb){
      let decimalized = userSpace.used / kb;
      let formatted = Math.round((decimalized + Number.EPSILON) * 100) / 100 + " KB";
      return formatted + " of " + maxSpaceFormatted + " used";
    } else if (userSpace.used < gb && userSpace.used > mb) {
      let decimalized = userSpace.used / mb;
      let formatted = Math.round((decimalized + Number.EPSILON) * 100) / 100 + " MB";
      return formatted + " of " + maxSpaceFormatted + " used";
    } else if (userSpace.used < tb && userSpace.used > gb) {
      let decimalized = userSpace.used / gb;
      let formatted = Math.round((decimalized + Number.EPSILON) * 100) / 100 + " GB";
      return formatted + " of " + maxSpaceFormatted + " used";
    }
  }

  return(
    <>
      { !token$.value && <Redirect to="/login" /> }
      <div className="profile__more">
        <div className="profile__more__profileInfo">
            <div className="profile__more__profileInfo__name">
              <p className="profile__more__profileInfo__name__text">{profile.name.display_name}</p>
            </div>
          <div className="profile__more__profileInfo__email">
            <p className="profile__more__profileInfo__email__text">{profile.email}</p>
          </div>
        </div>
        <div className="profile__more__lineBreakFat"></div>
        <div className="profile__more__spaceUsage">
          <p className="profile__more__spaceUsageText">{userSpaceFormatting()} </p>
        </div>
        <div className="profile__more__lineBreak"></div>
        <div className="profile__more__refLinkHeader">
          <p className="profile__more__refLinkHeader__text">Referral Link</p>
        </div>
        <input className="profile__more__refLinkInputDummy" ref={refInput} type="text" readOnly value={profile.referral_link} />
        <button className="profile__more__refLinkButton" onClick={copyToClipboard}>
          <div className="profile__more__refLinkButton__textContainer">
            <p classNameCopy="profile__more__refLinkButton__textContainer__text">Copy</p>
          </div>
          <LinkIcon className="profile__more__refLinkButton__linkIcon"/>
          <div className="profile__more__refLinkButton__textContainer">
            <p classNameCopy="profile__more__refLinkButton__textContainer__text">link</p>
          </div>
        </button>
        <div className="profile__more__lineBreak"></div>
        <button className="profile__more__logoutButton" onClick={logoutUser}><p>Logout</p></button>
      </div>
    </>
  );
}
