import { Pagination } from 'antd';
import styles from './styles.module.css';
import { FC } from 'react';

export const CustomPagination: FC<{
  total: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pageSize?: number;
}> = ({ total = 0, currentPage = 1, setCurrentPage, pageSize }) => {
  return (
    <div className={`${styles.paginationContainer} relative h-[48px] my-5`}>
      <Pagination
        style={{ background: 'var(--Background_blocks, #fffafa)' }}
        className=" w-fit inline-block-0 px-3 py-2 rounded-xl"
        current={currentPage ?? 1}
        onChange={(page) => {
          setCurrentPage(page);
        }}
        pageSize={pageSize}
        total={total ?? 0}></Pagination>
    </div>
  );
};
