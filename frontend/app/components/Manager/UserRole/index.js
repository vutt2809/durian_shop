/**
 *
 * UserRole
 *
 */

import React from 'react';

import { ROLES } from '../../../constants';
import Badge from '../../Common/Badge';

const UserRole = props => {
  const { className, user } = props;

  return (
    <>
      {user.role === ROLES.Admin ? (
        <Badge variant='primary' className={className}>
          Admin
        </Badge>
      ) : (
        <Badge className={className}>Customer</Badge>
      )}
    </>
  );
};

UserRole.defaultProps = {
  className: ''
};

export default UserRole;
