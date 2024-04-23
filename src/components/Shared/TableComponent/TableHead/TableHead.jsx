/* eslint-disable react/prop-types */

import Loading from '../../../../Shared/Loading';

const TableHead = ({ tableHeading }) => {
  return (
    <thead>
      <tr>
        {tableHeading.length > 0 ? (
          tableHeading.map((tableHadingName, index) => (
            <th
              className="px-5 py-3 border-b border-gray-200 text-left text-sm font-semibold text-slate-900 tracking-wider"
              key={index}>
              {tableHadingName}
            </th>
          ))
        ) : (
          <Loading />
        )}
      </tr>
    </thead>
  );
};

export default TableHead