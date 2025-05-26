import { Controller, Get, Patch, Param, Delete, NotFoundException, Body } from '@nestjs/common';
import { AdminService } from './admins.service';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller('admins')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':email')
  async findOne(@Param('email') email: string) {
    const admin = await this.adminService.findByEmail(email);
    if (!admin) {
      throw new NotFoundException('Admin no encontrado');
    }
    return admin;
  }

  @Patch(':email')
  update(@Param('email') email: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.updateAdmin(email, updateAdminDto);
  }

  @Delete(':email')
  remove(@Param('email') email: string) {
    return this.adminService.remove(email);
  }
}
