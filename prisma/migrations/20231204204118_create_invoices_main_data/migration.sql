--create invoices main data view

CREATE VIEW invoices_main_data AS
select (i.total_value*(o."share"/100)) as value, i.total_value as total_invoice_value, o."share", b."name" as building, p.unity, p.block, i.status,
case 
	when p2.id_imobzi is not null then 'person'
	when o2.id_imobzi is not null then 'organization' 
end as owner_type,
case
	when p2.id_imobzi  is not null then p2.id_imobzi 
	when o2.id_imobzi  is not null then o2.id_imobzi 
end as id_owner_imobzi,
case
	when p2.id_imobzi  is not null then p2.fullname  
	when o2.id_imobzi  is not null then o2."name"  
end as owner_name,
case 
	when p3.id_imobzi  is not null then 'person'
	when o3.id_imobzi  is not null then 'organization' 
end as tenant_type,
case 
	when p3.id_imobzi  is not null then p3.id_imobzi 
	when o3.id_imobzi  is not null then o3.id_imobzi  
end as id_tenant_imobzi,
case 
	when p3.id_imobzi  is not null then p3.fullname  
	when o3.id_imobzi  is not null then o3."name"  
end as tenant_name
from invoices i
inner join leases l on l.id_imobzi = i.id_lease_imobzi 
inner join properties p on p.id_imobzi = l.id_property_imobzi
inner join buildings b on b.id_imobzi = p.id_building_imobzi 
inner join owners o on o.id_property_imobzi = p.id_imobzi 
left join people p2 on p2.id_imobzi = o.id_owner_person_imobzi 
left join organizations o2 on o2.id_imobzi = o.id_owner_organization_imobzi 
left join people p3 on p3.id_imobzi = l.id_tenant_person_imobzi 
left join organizations o3  on o3.id_imobzi = l.id_tenant_organization_imobzi;
