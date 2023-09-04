import React from "react";
import { useAsyncDebounce } from "react-table";
import { Col } from 'react-bootstrap';

const GlobalSearch = (prop: any) => {

    // Taking out some properties and methods from the table instance
    const {
        state,
        setGlobalFilter,
    } = prop.tableInstance

    const { globalFilter } = state

    // GLobal level filtering is defined here
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200);


    return (
        <>
            <Col className="d-flex justify-content-start">
                <div className="input-group rounded">
                    <input type="search"
                        className="form-control input-sm border-1 ps-2" placeholder="Search"
                        aria-label="Search"
                        aria-describedby="search-addon"
                        value={value || ""}
                        onChange={e => {
                            setValue(e.target.value);
                            onChange(e.target.value);
                        }}
                    />
                    <span className="input-group-text border-0 ms-1">
                        <i className="bi bi-search"></i>
                    </span>
                </div>
            </Col>
        </>
    )
}

export default GlobalSearch