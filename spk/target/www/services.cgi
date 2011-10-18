#!/usr/bin/perl
use Cwd;
use CGI;

$cgi=new CGI;

# set to "1" to get a /tmp/sslh.txt file
$debug=1;

#open up debugfile
if ($debug) {
	if (!(open(DEBUG,">/tmp/sslh.txt"))) {
		$debug=0;
	}
}

sub sdbg {
	if ($debug) {
		print DEBUG $_[0] ."\n";
	}
}


print "Content-type: text/html\n\n";


# Are we authenticated yet ?

if (open (IN,"/usr/syno/synoman/webman/modules/authenticate.cgi|")) {
	$user=<IN>;
	chop($user);
	close(IN);
}


# if not admin or no user at all...no authentication...so, bye-bye

if ($user ne 'admin') {
	print '{ success:false, "msg":"Veuillez vous connecter admin."}';
	die;
}

$res='{ success:true, "msg":"Mise à jour terminée avec succès !"}';

if ($cgi->param('sslh'))
{
	$sslh='1';
} else {
	$sslh='0';
}
if ($cgi->param('scp'))
{
	$scp='1';
} else {
	$scp='0';
}
if ($cgi->param('proxy'))
{
	$tinyproxy='1';
} else {
	$tinyproxy='0';
}
$sslh_address=$cgi->param('sslhaddress');
$sslh_port=$cgi->param('sslhport');
$ssh_address=$cgi->param('sshaddress');
$ssh_port=$cgi->param('sshport');
$ssl_address=$cgi->param('ssladdress');
$ssl_port=$cgi->param('sslport');
$vpn_address=$cgi->param('vpnaddress');
$vpn_port=$cgi->param('vpnport');
$tinyproxy_address=$cgi->param('proxyaddress');
$tinyproxy_port=$cgi->param('proxyport');

&sdbg("sslh:$sslh");
&sdbg("scp:$scp");
&sdbg("tinyproxy:$tinyproxy");
&sdbg("sslh_address:$sslh_address");
&sdbg("sslh_port:$sslh_port");
&sdbg("ssh_address:$ssh_address");
&sdbg("ssh_port:$ssh_port");
&sdbg("ssl_address:$ssl_address");
&sdbg("ssl_port:$ssl_port");
&sdbg("vpn_address:$vpn_address");
&sdbg("vpn_port:$vpn_port");
&sdbg("tinyproxy_address:$tinyproxy_address");
&sdbg("tinyproxy_port:$tinyproxy_port");

# Mise à jour du fichier extension.ini
if (!(open(EXT,">/usr/local/sslh/extension.ini"))) {
	$res='{ success:false, "msg":"Impossible d\'ouvrir le fichier /usr/local/sslh/extension.ini en écriture"}';
} else {
	print EXT "sslh_enabled=$sslh\n";
	print EXT "scp_enabled=$scp\n";
	print EXT "tinyproxy_enabled=$tinyproxy\n";
	close(EXT);
	
	# Mise à jour du fichier sslh.ini
	if (!(open(SSLH,">/usr/local/sslh/sslh.ini"))) {
		$res='{ success:false, "msg":"Impossible d\'ouvrir le fichier /usr/local/sslh/sslh.ini en écriture"}';
	} else {
		print SSLH "listen=$sslh_address:$sslh_port\n";
		print SSLH "ssh=$ssh_address:$ssh_port\n";
		print SSLH "ssl=$ssl_address:$ssl_port\n";
		print SSLH "openvpn=$vpn_address:$vpn_port\n";
		close(SSLH);
		
		# Mise à jour du fichier tinyproxy.conf
		if (!(open(IN,"/usr/local/sslh/tinyproxy.conf.tpl"))) {
			$res='{ success:false, "msg":"Impossible d\'ouvrir le fichier /usr/local/sslh/tinyproxy.conf.tpl en lecture"}';
		} else {
			if (!(open(OUT,">/usr/local/sslh/tinyproxy.conf"))) {
				$res='{ success:false, "msg":"Impossible d\'ouvrir le fichier /usr/local/sslh/tinyproxy.conf en ecriture"}';
				close(IN);
			} else {
				$tmpl{'PORT'} = "Port $tinyproxy_port";
				$tmpl{'LISTEN'} = "Listen $tinyproxy_address";
				while (<IN>) {
					s/==:([^:]+):==/$tmpl{$1}/g;
					print OUT $_;
				}
				close(IN);
				close(OUT);
			}
		}
	}
}

print $res ."\n\n";

&sdbg("sending result:$res");

if ($debug) {
	close(DEBUG);
}

exit 0;
