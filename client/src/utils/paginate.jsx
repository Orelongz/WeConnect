import React from 'react';
import PropTypes from 'prop-types';
import Pagination from 'rc-pagination';

const propTypes = {
  allBusinesses: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  current: PropTypes.number
};

/**
 * Paginate
 * @param {Object} param
 * @return {Object} pagination component
 */
function Paginate({
  allBusinesses: total, pageSize, onChange, current
}) {
  return (
    <div>
      <Pagination
        showTotal={(allBusinesses, range) => `${range[0]} - ${range[1]} of ${allBusinesses} items`}
        locale={{ items_per_page: 'Items' }}
        total={total}
        pageSize={pageSize}
        current={current}
        onChange={onChange}
      />
    </div>
  );
}
Paginate.propTypes = propTypes;

export default Paginate;
