import Modal from "react-bootstrap/Modal";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { hideVariantModal } from "../../redux/reducers/cart";
import { RootState } from "../../redux/store";
import ProductVariantAndBuy from "../product/VariantAndBuy";
import ProductImage from "../productsList/ProductImage";
import NoImage from "../NoImage";
import { TThumbRatio } from "../../@types/image";
import { IImagePartial } from "../../lib/imgs";

export default function ChooseVariantModal() {
  const dispatch = useAppDispatch();
  const show = useAppSelector(
    (state: RootState) => state.cart.showVariantModal
  );
  const { product } = useAppSelector(
    (state: RootState) => state.cart.variantModalData
  );

  const onHide = () => dispatch(hideVariantModal());
  const image: IImagePartial | undefined = product
    ? { path: product.medias[0].fileUrl }
    : undefined;

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Please Proceed:</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {product && (
          <>
            <div className={"d-flex mb-3"}>
              <div className={"me-2"} style={{ width: "60px" }}>
                {image ? (
                  <ProductImage image={image} maxSize={60} />
                ) : (
                  <NoImage ratio={TThumbRatio["1-1"]} className={"bg-xs"} />
                )}
              </div>
              <h6>{product.name}</h6>
            </div>
            <ProductVariantAndBuy product={product} onAddedToCart={onHide} />
          </>
        )}
      </Modal.Body>
    </Modal>
  );
}
