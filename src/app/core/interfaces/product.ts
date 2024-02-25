export interface IProduct {
    id: string,
    name: string,
    description: string,
    logo: string,
    date_release: string,
    date_revision: string,
    isMenuOpen?: boolean,
}
/* 
unit test jest

product services test


create
update 
delete
list

 general services test
 
data to text

set data revision

filter pipe test and paginator test

return all data if text filter is empty base on maxrows

- spect all data  base on maxrows 5

- spect all data  base on maxrows 10

- spect all data  base on maxrows 20

- spect empty when filter name not exit

- spect 1 record if filter by id

- spect no records if filter by id dont mach

- spect records if filter by date_release

- spect no records if filter by date_release dont mach

- spect records if filter by name
return no records if filter by description dont mach

- spect records if filter by description

- spect no records if filter by description dont mach

- spect to button preview es disabled

- spect to button next is active if have more than the maxrow size

- spect to button next is disabledif it same to the maxrow size

- spect to add btn send me to location /product/new
- spect to edit  btn send me to location /product/edit/:id
- spect to remove  btn  open confirm modal

- spect to confirm modal close when click cancel btn

- spect to confirm modal confirm delete when click confirm btn

- specto to toast message open when confirm delete product

- specto to toast message open when confirm create new product

- specto to toast message open when confirm update new product


new product

- spect to all validate message show when click submit btn
- spect to self input validate show when interect whit input

- spect to id validate message =" id invalido"

- spect to id click duplicate validator show message "id duplicado"
 */