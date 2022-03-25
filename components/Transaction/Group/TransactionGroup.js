import s from "./TransactionGroup.module.css";
export default function TransactionGroup({ title, children }) {
  return (
    <>
      <tr key={title} className={s.tr}>
        <td colspan="2" className={s.title}>
          {title}
        </td>
      </tr>
      {children}
    </>
  );
}
