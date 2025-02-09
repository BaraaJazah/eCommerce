import { Dropdown } from "react-bootstrap";
import { useAppDispatch } from "../../../../hook/Hooks";
import { actGetProductByCatagory } from "../../../../store/product/productSlice";
import { Link } from "react-router-dom";

type Props = {
  catagory: {
    catagory: { name: string },
    subCatagories: {
      id: string
      name: string
    }[]
  }
}


export default function Links({ catagory }: Props) {
  const dispatch = useAppDispatch()
  return (
    <>
      <li>
        <Dropdown className="d-inline mx-2" >
          <Dropdown.Toggle style={{ backgroundColor: "transparent", border: "none", outline: "none", padding: "10px 15px", fontSize: "15px" }} variant="success" id="dropdown-basic" >
            {catagory.catagory.name} <span className="caret"></span>
          </Dropdown.Toggle>
          <Dropdown.Menu style={{}} >
            {
              catagory.subCatagories.map((el, index) => {
                return (
                  <Link to={"/catagoryProducts"} onClick={() => { console.log(dispatch(actGetProductByCatagory(el.id)).unwrap()) }} key={index} style={{ color: "#FF6666", display: "flex" }} >{el.name} </Link>
                )
              })
            }
          </Dropdown.Menu>
        </Dropdown>
      </li>
    </>

  )
}


