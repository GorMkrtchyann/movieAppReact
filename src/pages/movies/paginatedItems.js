import {useState} from "react";
import ReactPaginate from "react-paginate";
import {useNavigate, useParams} from "react-router";
import React from "react";

export const PaginatedItems = React.memo(({ itemsPerPage, items }) => {
    const [itemOffset, setItemOffset] = useState(0);
    const params = useParams()
    const navigate = useNavigate()

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);

    const Items = ({currentItems}) => {
        return (
            <div className={"movie__section__items"}>
                {currentItems?.map(el => (
                    <div
                        key={el.id}
                        className={"movie__section__item"}
                        onClick={() => navigate(`/movies-details/${el.id}`)}
                    >
                        <div className={"movie__section__item__img flax-center"}>
                            <img src={el.img} alt="k"/>
                        </div>
                        <p>{el.name}</p>
                        <b>{el.genre}</b>
                        <span>{el.date}</span>
                        <div className={"likes"}>
                            <p>{el.rating}</p>
                            <i className="fa-solid fa-heart"/>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        setItemOffset(newOffset);
        navigate(`/movies/${event.selected + 1}`)
    };

    return (
        <>
            <Items currentItems={currentItems} />
            <ReactPaginate
                breakLabel="..."
                nextLabel={<i className="fa-solid fa-caret-right" style={{color: "#fffff"}}/>}
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                previousLabel={<i className="fa-solid fa-caret-left" style={{color: "#fffff"}}/>}
                renderOnZeroPageCount={null}
                initialPage={+params.page-1}
            />
        </>
    );
})
