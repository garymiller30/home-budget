import s from "./TransactionGroup.module.css";

export default function TransactionGroup({ title }) {
  return (
    <tr className={s.tr}>
      <td colSpan={2} className={s.title}>
        {title}
      </td>
    </tr>
  );
}
