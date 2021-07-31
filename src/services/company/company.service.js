import service from "../service";

class CompanyService {
    getAllCompany() {
        let data = service.get('company/getall');
        return data;
    }

    addCompany(data) {
        return service.post("company/register", data);
    }

    deleteCompany(companyCode) {
        return service.delete(`company/delete/${companyCode}`);
    }
}

export default new CompanyService();