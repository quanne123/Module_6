import {useState} from "react";
import {useParams} from "react-router";

function FoodDetail() {

    const [foods, setFoods] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const param = useParams();
    const dispatch = useDispatch();
    const name = localStorage.getItem("name");

    const handleChangeQuantity = (e) => {
        setQuantity(+e.target.value);
    };

    const handleAddCartDetail = (foodId, foodPrice) => {
        dispatch(
            addCartDetailAction({
                quantity: quantity,
                foodDTO: { id: foodId },
                total: foodPrice,
            }, name)
        );
    };

    useEffect(() => {
        const getfoods = async () => {
            try {
                const foodsResponse = await foodservice.findAll();
                setfoods(foodsResponse.data.content);
            } catch (error) {
                console.warn(error);
            }
        };

        getfoods();
    }, []);

    useEffect(() => {
        const getfood = async () => {
            const foodResponse = await foodservice.findById(param.id);
            setfood(foodResponse.data);
        };

        getfood();
    }, [param.id]);

    if (!food) {
        return null;
    }

}