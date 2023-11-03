import React from 'react';

export default function Alert(props) {
  return (
    // Render the alert only if `props.alert` is truthy
    props.alert && (
      <div>
        <div
          className={`alert alert-${props.alert.type} alert-dismissible fade show`}
          role="alert"
        >
          <strong></strong>
          {/* Display the message from `props.alert` */}
          {props.alert.msg}
        </div>
      </div>
    )
  );
}
