function selectProduct(product) {
    const productNames = {
        'polo_basico': 'Polo Básico',
        'polo_acid_washed': 'Polo Acid Washed',
        'polo_oversize': 'Polo Oversize'
    };
    document.getElementById('product').value = product;
    document.getElementById('productSelection').style.display = 'none';
    document.getElementById('options').style.display = 'block';
    document.getElementById('selectedProductTitle').innerText = productNames[product];
    updateOptions(product);
    clearSelections('all');
    document.getElementById(product + '_option').classList.add('selected');
}

function setUbicacion(ubicacion) {
    clearSelections('ubicacion');
    document.getElementById(ubicacion + '_option').classList.add('selected');
    document.getElementById('ubicacion').value = ubicacion;
    showTamanoOptions(ubicacion);
}

function showTamanoOptions(ubicacion) {
    const tamanos = ['solo_adelante_mediano_option', 'solo_adelante_grande_option', 'ambas_mediano_option', 'ambas_grande_option'];
    tamanos.forEach(tamanoId => {
        document.getElementById(tamanoId).style.display = 'none';
    });
    if (ubicacion === 'solo_adelante') {
        document.getElementById('solo_adelante_mediano_option').style.display = 'flex';
        document.getElementById('solo_adelante_grande_option').style.display = 'flex';
    } else if (ubicacion === 'ambas') {
        document.getElementById('ambas_mediano_option').style.display = 'flex';
        document.getElementById('ambas_grande_option').style.display = 'flex';
    }
    document.getElementById('tamano').value = '';
    document.getElementById('tamanoOptions').style.display = 'block';
}

function setTamano(tamano) {
    clearSelections('tamano');
    const ubicacion = document.getElementById('ubicacion').value;
    const selectedSizeId = ubicacion === 'solo_adelante' ? 'solo_adelante_' + tamano + '_option' : 'ambas_' + tamano + '_option';

    document.getElementById(selectedSizeId).classList.add('selected');
    document.getElementById('tamano').value = tamano;
}

function setTalla(talla) {
    clearSelections('talla');
    document.getElementById('talla').value = talla;
    document.querySelectorAll('#tallaOptions button').forEach(button => {
        button.classList.remove('selected');
    });
    document.querySelector(`#tallaOptions button[onclick="setTalla('${talla}')"]`).classList.add('selected');
}

function clearSelections(type) {
    if (type === 'ubicacion' || type === 'all') {
        document.querySelectorAll('#ubicacionOptions .ubicacion-option').forEach(option => {
            option.classList.remove('selected');
        });
    }
    if (type === 'tamano' || type === 'all') {
        document.querySelectorAll('#tamanoOptions .tamano-option').forEach(option => {
            option.classList.remove('selected');
        });
    }
    if (type === 'color' || type === 'all') {
        document.querySelectorAll('#colorOptions .color-option').forEach(option => {
            option.classList.remove('selected');
        });
    }
    if (type === 'talla' || type === 'all') {
        document.querySelectorAll('#tallaOptions button').forEach(button => {
            button.classList.remove('selected');
        });
    }
}

function backToSelection() {
    document.getElementById('productSelection').style.display = 'flex';
    document.getElementById('options').style.display = 'none';
    document.getElementById('result').innerText = '';
    document.getElementById('unitPrice').innerText = '';
    clearSelections('all');
}

function updateOptions(product) {
    const colorOptions = document.getElementById('colorOptions');
    if (product === 'polo_basico') {
        colorOptions.style.display = 'block';
    } else {
        colorOptions.style.display = 'none';
    }
}

function setColor(color) {
    clearSelections('color');
    document.getElementById(color + '_option').classList.add('selected');
    document.getElementById('color').value = color;
}

function calculatePrice() {
    const product = document.getElementById('product').value;
    const color = document.getElementById('color').value;
    const ubicacion = document.getElementById('ubicacion').value;
    const tamano = document.getElementById('tamano').value;
    const talla = document.getElementById('talla').value;
    const unidades = parseInt(document.getElementById('unidades').value);

    if (!product || !ubicacion || !tamano || (product === 'polo_basico' && !color) || !talla) {
        alert('Por favor, asegúrate de seleccionar todas las opciones necesarias.');
        return;
    }

    let basePrice = getPriceBasedOnOptions(product, color, ubicacion, tamano);
    if (talla === 'XL') {
        basePrice += 3; // Añadir 3 soles si la talla es XL
    }

    let totalPrice = basePrice * unidades;
    let unitPrice = basePrice;

    document.getElementById('result').innerText = 'Precio Total: S/' + totalPrice.toFixed(2);
    document.getElementById('unitPrice').innerText = 'Precio Unitario: S/' + unitPrice.toFixed(2);
}

function getPriceBasedOnOptions(product, color, ubicacion, tamano) {
    const prices = {
        'polo_basico': {
            'colores': {
                'solo_adelante': {'mediano': 40, 'grande': 45},
                'ambas': {'mediano': 50, 'grande': 55}
            },
            'blanco': {
                'solo_adelante': {'mediano': 35, 'grande': 40},
                'ambas': {'mediano': 45, 'grande': 50}
            }
        },
        'polo_acid_washed': {
            'solo_adelante': {'mediano': 55, 'grande': 60},
            'ambas': {'mediano': 65, 'grande': 70}
        },
        'polo_oversize': {
            'solo_adelante': {'mediano': 48, 'grande': 50},
            'ambas': {'mediano': 65, 'grande': 65}
        }
    };

    if (product !== 'polo_basico') {
        return prices[product][ubicacion][tamano];
    } else {
        return prices[product][color][ubicacion][tamano];
    }
}

window.onload = function() {
    clearSelections('all');
}
