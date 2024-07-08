import React from "react";
import styles from "@/app/ui/resources/resources.module.scss";
import classNames from "classnames";
import { ChevronRightIcon } from "@radix-ui/react-icons";

interface DropDownProps {
  children?: React.ReactNode;
  label: string;
  stateVal: boolean;
  stateSetter: React.Dispatch<React.SetStateAction<boolean>>;
}
export const DropDown: React.FC<DropDownProps> = ({
  children,
  label,
  stateVal,
  stateSetter,
}) => {
  return (
    <div className={styles.dropDown}>
      <div
        className={styles.dropDownLabel}
        onClick={() => stateSetter(!stateVal)}
      >
        <div className={styles.dropDownTitle}>{label}</div>
        <div
          className={classNames({
            [styles.dropDownChevron]: stateVal,
            [styles.dropRightChevron]: !stateVal,
          })}
        >
          <ChevronRightIcon />
        </div>
      </div>
      <div
        className={classNames({
          [styles.dropContainer]: stateVal,
          [styles.dropHidden]: !stateVal,
        })}
      >{children}</div>
    </div>
  );
};
