const CurrencyItem = ({ index, data: { name, rate, fee, realRate, url, note, modified } }) => {
  return (
    <tr className="border-b border-gray-700">
      <td>{index + 1}</td>
      <td className="py-1">
        <a className="px-1  hover:underline" href={url} target="_blank" rel="noopener noreferrer">
          {name}
        </a>
      </td>
      <td className="">
        <div className="inline-flex font-medium rounded-md px-2">{realRate}</div>
      </td>
      <td>
        {rate !== realRate ? (
          <div className="px-1 text-gray-500 text-sm">{rate}</div>
        ) : (
          <div className="text-center">-</div>
        )}
      </td>
      <td>
        {rate !== realRate ? (
          <div className="inline-flex text-red-500 text-sm rounded-md px-1">{fee}</div>
        ) : (
          <div className="text-center">-</div>
        )}
      </td>
      <td className="hidden sm:block">
        {note ? <div className="inline-flex px-1 text-gray-500 text-sm break-all">{note}</div> : ""}
      </td>
    </tr>
  );
};

export default CurrencyItem;
