import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import "./styles.css";

import { useAddItem } from '../../hooks/useAddItem';
import { useGetItems } from '../../hooks/useGetItems';
import { useGetUserID } from '../../hooks/useGetUserID';
import { useDeleteItem } from '../../hooks/useDeleteItem';

export const Collections = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [item, setDeleteItem] = useState(null);
    const [itemName, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [brandOrCreator, setBrandOrCreator] = useState("");
    const [price, setPrice] = useState(0);
    const [series, setSeries] = useState("");
    const [character, setCharacter] = useState("");
    const [dateAcquired, setDateAcquired] = useState(null);
    const [inCollection, setInCollection] = useState("yes");

    const { addItem } = useAddItem();
    const { items, totalItems } = useGetItems();
    const { name, profilePhoto, userID } = useGetUserID();
    const navigate = useNavigate();
    const { deleteItem } = useDeleteItem(item);

    const types = ["image/png", "image/jpeg", "image/jpg"];

    const onSubmit = (e) => {
        e.preventDefault();
        addItem({
            userID,
            itemName,
            file,
            description,
            type,
            brandOrCreator,
            price,
            series,
            character,
            dateAcquired,
            inCollection
        });

        setName("");
        setDescription("");
        setType("");
        setBrandOrCreator("");
        setPrice(0);
        setSeries("");
        setCharacter("");
        setDateAcquired(null);
        setInCollection("yes");

        // need some sort of form error handling
        if (error) {
            console.error(error);
        }
            
    };

    const signUserOut = async () => {
        try {
            await signOut(auth);
            localStorage.clear();
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <div className="collections">
            <br></br>
                    {profilePhoto && <div className="profile">
                        <img className="profile-photo" src={profilePhoto} alt="user's profile" />
                        <br></br>
                        <button className="sign-out-button" onClick={signUserOut}>
                            Sign Out
                        </button>
                    </div>}
                <div className="container">
                    <h1>{name}'s Collection</h1>
                    <div className="item">
                        <h1>Add an Item</h1>
                    </div>
                    <form className="add-item" onSubmit={onSubmit}>
                        <input type="file"
                            required
                            onChange={(e) => {
                                let selectedFile = e.target.files[0];
                                if (selectedFile) {
                                    if (types.includes(selectedFile.type)) {
                                        setError(null);
                                        setFile(selectedFile);
                                    } else {
                                        setFile(null);
                                        setError("Please select an image file (png or jpg)");
                                    }
                                }
                            }}
                        />
                        <br></br>
                        <input type="text"
                            placeholder="Item Name"
                            required
                            onChange={(e) => setName(e.target.value)}
                        />
                        <br></br>
                        <input
                            type="text"
                            placeholder="Description"
                            required
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <br></br>
                        <input
                            type="text"
                            placeholder="Type"
                            onChange={(e) => setType(e.target.value)}
                        />
                        <br></br>
                        <input
                            type="text"
                            placeholder="Brand or Creator"
                            onChange={(e) => setBrandOrCreator(e.target.value)}
                        />
                        <br></br>
                        <input
                            type="number"
                            placeholder="Price"
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <br></br>
                        <input
                            type="text"
                            placeholder="Series"
                            onChange={(e) => setSeries(e.target.value)}
                        />
                        <br></br>
                        <input
                            type="text"
                            placeholder="Character"
                            onChange={(e) => setCharacter(e.target.value)}
                        />
                        <br></br>
                        <input
                            type="date"
                            placeholder="Date Acquired"
                            onChange={(e) => setDateAcquired(e.target.value)}
                        />
                        <br></br>
                        In Collection:
                        <label>
                            <input
                                type="radio"
                                name="inCollectionRadio"
                                value="yes"
                                defaultChecked={true}
                                onChange={(e) => setInCollection(e.target.value)}
                            />
                            Yes
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="inCollectionRadio"
                                value="no"
                                onChange={(e) => setInCollection(e.target.value)}
                            />
                            No
                        </label>
                        <br></br>
                        <button type="submit">Add Item</button>
                    </form>
                    
                </div>

                <div className="items">
                    <h2>All { totalItems } Items</h2>
                    <ul>
                        {items.map((item) => {
                            const { itemName, description, type, brandOrCreator, price, series, character, dateAcquired, inCollection } = item;
                            return (
                                <div className="card" key={item.id}>
                                    <div className="card-header"> {itemName} </div>
                                    <div className="card-body">
                                    <p> description: {description} </p>
                                    <p> type: {type} </p>
                                    <p> brand/creator: {brandOrCreator} </p>
                                    <p> price: {price} </p>
                                    <p> series: {series} </p>
                                    <p> character: {character} </p>
                                    <p> date acquired: {dateAcquired} </p>
                                    <p> still in collection: {inCollection} </p>
                                    <button className="delete-item" type="button" onClick={() => {
                                        setDeleteItem(item);
                                        deleteItem();
                                    }}> Delete Item</button>
                                    </div>
                                </div>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </>
    );
};