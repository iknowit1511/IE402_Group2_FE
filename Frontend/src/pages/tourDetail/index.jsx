import React, { memo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import "./style.scss";

function TourDetail() {
  return (
    <div className="tour-detail-container">
      <div className="search_bar">
        <input
          type="text"
          placeholder="Tìm kiếm tour bạn thích..."
          id="searchText"
          required
        />
        <button type="submit" className="search-button">
          <i className="fa-solid fa-magnifying-glass">
            <CiSearch strokeWidth={1} />
          </i>
        </button>
      </div>

      <div className="breadcrumb">
        <a href="/" className="breadcrumb-link">
          Trang chủ
        </a>
        <span className="arrow"> &gt; </span>
        <a href="/tour" className="breadcrumb-link">
          <span>Tour</span>
        </a>
        <span className="arrow"> &gt; </span>
        <a href="/tour-detail" className="breadcrumb-link">
          <span className="current">Huế mộng mơ - Dấu ấn cố đô</span>
        </a>
      </div>
    </div>
  );
}

export default memo(TourDetail);
