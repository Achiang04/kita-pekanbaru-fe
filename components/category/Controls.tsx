import { TQuery } from "../../@types/common";
import SortButtons from "../SortButtons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSlidersH } from "@fortawesome/free-solid-svg-icons/faSlidersH";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export default function CaregoryControls({
  params,
  onSort,
  onMobileShow,
}: ControlBarProps) {
  return (
    <div className="category-controls">
      <div className="category-controls__mobile">
        <button
          className="btn btn-outline-secondary category-controls__toggle-filters"
          onClick={onMobileShow}
        >
          <FontAwesomeIcon className="me-2" icon={faSlidersH as IconProp} />
          Filters
        </button>
      </div>
      <SortButtons
        params={params}
        onSort={onSort}
        className="category-controls__sort"
      />
    </div>
  );
}

interface ControlBarProps {
  params: TQuery;
  onSort: (query: TQuery) => void;
  onMobileShow: (e: React.MouseEvent) => void;
}
