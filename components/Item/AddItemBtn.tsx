"use client";

const AddItemBtn = () => {
    const addItem = async () => {
        const valresponse = await fetch("/api/createitem", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: 'item 1',
              description: 'description',
            })
          });
          const jresp = await valresponse.json();
          alert(jresp);
      }

    return (
        <button 
        onClick={() => addItem()}
        className="rounded-md bg-primary py-4 px-9 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp">
          Add Item
      </button>
    )

}

export default AddItemBtn;