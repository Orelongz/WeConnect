import React from 'react';
import PropTypes from 'prop-types';
import Pagination from 'rc-pagination';

const propTypes = {
  total: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

function Paginate({ total, pageSize, onChange, current }) {
  return (
    <div>
      <Pagination
        showTotal={(total, range) => `${range[0]} - ${range[1]} of ${total} items`}
        locale={{ items_per_page: 'Items' }}
        total={total}
        pageSize={pageSize}
        onChange={onChange}
        current={current}
      />
    </div>
  );
}
Paginate.propTypes = propTypes;

export default Paginate;
