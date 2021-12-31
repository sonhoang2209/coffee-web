 // useEffect(() => {
    //     const getProductList = async () => {
    //         try {
    //             const response = await getProduct()
    //             setDataCoffee(response?.data)
    //             // console.log('data', response.data);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     }

    //     getProductList()

    // }, [])
    
    // const getProductList = () => {
    //     fetch('http://localhost:4000/coffee', {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             setDataCoffee(data)
    //             // console.log('Success:', dataCoffee);
    //         })
    //         .catch((error) => {
    //             console.error('Error:', error);
    //         })
    // }
    

    // useEffect(() => {
    //     getProductList();
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])  