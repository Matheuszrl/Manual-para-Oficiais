document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            const tabGroup = tab.getAttribute('tab-group');
            
            tabs.forEach(
                t => {
                    if (t.getAttribute('tab-group') == tabGroup){
                        t.classList.remove('active')
                    }
                }                
            );
            contents.forEach(
                c => {
                    if (c.getAttribute('tab-group') == tabGroup){
                        c.classList.remove('active')
                    }
                }             
            );
            tab.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
});

document.querySelectorAll('.expand-button').forEach(button => {
    button.addEventListener('click', () => {
        const expanded = button.getAttribute('aria-expanded') === 'true' || false;
        button.setAttribute('aria-expanded', !expanded);
        const content = document.getElementById(button.getAttribute('aria-controls'));
        content.classList.toggle('open');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Seleciona todos os elementos necessários
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('zoomedImage');
    const closeButton = document.querySelector('.close-button');
    const zoomableImages = document.querySelectorAll('.zoomable-image img');

    // Adiciona evento de clique para cada imagem
    zoomableImages.forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = 'block';
            modalImg.src = this.src;
        });
    });

    // Fecha o modal ao clicar no X
    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Fecha o modal ao clicar fora da imagem
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Fecha o modal com a tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modal.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Encontra todos os itens do menu que têm submenu
    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach(item => {
        const header = item.querySelector('.menu-header');
        const submenu = item.querySelector('.submenu');

        // Só adiciona o evento de clique se houver um submenu e não for um link
        if (submenu && !header.hasAttribute('href')) {
            header.addEventListener('click', (e) => {
                e.preventDefault();
                // Toggle da classe expanded
                item.classList.toggle('expanded');

                // Fecha outros submenus abertos no mesmo nível
                const siblings = [...item.parentElement.children].filter(child => child !== item);
                siblings.forEach(sibling => {
                    sibling.classList.remove('expanded');
                });
            });
        }

        // Adiciona evento de clique para selecionar item
        header.addEventListener('click', (e) => {
            // Se for um link, permite a navegação padrão
            if (header.hasAttribute('href')) {
                return;
            }

            e.preventDefault();
            
            // Remove a classe active de todos os itens
            menuItems.forEach(menuItem => {
                menuItem.classList.remove('active');
            });
            
            // Adiciona a classe active ao item clicado
            item.classList.add('active');
            
            // Previne a propagação do evento para não interferir com a expansão do submenu
            e.stopPropagation();
        });
    });

    // Expande automaticamente o menu que contém o item ativo
    const activeItem = document.querySelector('.menu-item.active');
    if (activeItem) {
        let parent = activeItem.parentElement;
        while (parent.classList.contains('submenu')) {
            parent.parentElement.classList.add('expanded');
            parent = parent.parentElement.parentElement;
        }
    }
});