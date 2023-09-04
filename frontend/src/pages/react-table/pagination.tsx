import { Row, Col, Button } from 'react-bootstrap';

const Pagination = (prop: any) => {

    // Taking out some properties and methods from the table instance
    const {
        nextPage,
        previousPage,
        state,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize,
    } = prop.tableInstance

    const { pageIndex, pageSize } = state

    return (
        <>
            <Row className="mt-2">
                <Col>
                    <span>Page {' '}
                        <strong>
                            {pageIndex + 1} of {pageOptions.length}
                        </strong> {' '}
                    </span>
                    <span>
                        | Go to page {' '}
                        <input style={{ width: '100px' }} type="number" defaultValue={pageIndex + 1}
                            onChange={(e) => {
                                const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                                gotoPage(pageNumber)
                            }}
                        />
                    </span>
                    <select className="ms-2" style={{ height: "28px" }} value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)) }}>
                        {
                            [10, 20, 30, 50, 100].map(pageSize => (
                                <option key={pageSize} value={pageSize}>Show {pageSize}</option>
                            ))
                        }
                    </select>
                </Col>
                <Col className="d-flex justify-content-end">
                    <Button className="ms-1" onClick={() => { gotoPage(0) }} disabled={!canPreviousPage}>{"<<"}</Button>
                    <Button className="ms-2" onClick={() => { previousPage() }} disabled={!canPreviousPage}><i className="bi bi-arrow-left"></i></Button>
                    <Button className="ms-1" onClick={() => { nextPage() }} disabled={!canNextPage}><i className="bi bi-arrow-right"></i></Button>
                    <Button className="ms-2" onClick={() => { gotoPage(pageCount - 1) }} disabled={!canNextPage}>{">>"}</Button>
                </Col>
            </Row>
        </>
    )
}

export default Pagination