import s from "./TransactionGroup.module.css";
export default function TransactionGroup({ title, children }) {
  return (
    <>
      <tr className={s.tr}>
        <td colSpan="2" className={s.title}>
          {title}
        </td>
        <td></td>
      </tr>
      {children}
    </>
  );
}
