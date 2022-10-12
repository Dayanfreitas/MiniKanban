const ReadFile = function(){

    const read = async (file) => {
        
        return new Promise(async (resolve) => {
            var rawFile = new XMLHttpRequest();
            rawFile.open("GET", file, false);
            rawFile.onreadystatechange = async function ()
            {
                if(rawFile.readyState === 4)
                {
                    if(rawFile.status === 200 || rawFile.status == 0)
                    {
                        var allText = rawFile.responseText;
                        resolve(allText);
                    }
                }
            }

            rawFile.send(null);
        })
    }

    return {
        read
    }
}()