const CurrencyItem = ({ data: { name, rate, fee, realRate, url, note, modified } }) => {
  return (
    <tr className="border-b border-gray-300 text-center">
      <td className="py-1">
        <a className="px-1 hover:underline" href={url} target="_blank" rel="noopener noreferrer">
          {name}
        </a>
      </td>
      <td className="">
        <div className="inline-flex font-medium rounded-md px-2">
          {realRate > 0 ? realRate.toFixed(2) : "-"}
        </div>
      </td>
      <td>
        {rate !== realRate ? (
          <div className="px-1 text-gray-500">{rate.toFixed(2)}</div>
        ) : (
          <div className="">-</div>
        )}
      </td>
      <td>
        {rate !== realRate ? (
          <div className="inline-flex text-red-500 rounded-md px-1">{fee.toFixed(2)}</div>
        ) : (
          <div className="">-</div>
        )}
      </td>
      <td className="hidden sm:block">
        {note ? <div className="inline-flex px-1 text-gray-500 break-all">{note}</div> : ""}
      </td>
    </tr>
  );
};

export default CurrencyItem;
